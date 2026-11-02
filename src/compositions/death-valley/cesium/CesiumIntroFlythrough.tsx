import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
	AbsoluteFill,
	cancelRender,
	continueRender,
	delayRender,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';
import {smoothFlightPath, type LngLat} from './flight-path';

export type {LngLat} from './flight-path';

export type CesiumIntroFlythroughProps = {
	path: LngLat[];
	// Số frame dành cho đoạn zoom từ vũ trụ (phần còn lại là flythrough)
	introDurationInFrames?: number;
	// Độ cao camera lúc bắt đầu (mét ASL) — view toàn cầu
	spaceAltitude?: number;
	pathSmoothingPasses?: number;
	altitudeStart?: number;
	altitudeEnd?: number;
	lookAheadKm?: number;
	travelKm?: number;
	pitchFromNadir?: number;
	verticalExaggeration?: number;
};

const MAPTILER_KEY = process.env.REMOTION_MAPTILER_KEY;
const CESIUM_VER = '1.143';
const CDN = `https://cesium.com/downloads/cesiumjs/releases/${CESIUM_VER}/Build/Cesium/`;
const R = 6371;
const MAX_BANK = 0.13;
const BANK_GAIN = 0.6;

const havKm = (a: number[], b: number[]) => {
	const r = Math.PI / 180;
	const dLat = (b[1] - a[1]) * r;
	const dLng = (b[0] - a[0]) * r;
	const h =
		Math.sin(dLat / 2) ** 2 +
		Math.cos(a[1] * r) * Math.cos(b[1] * r) * Math.sin(dLng / 2) ** 2;
	return 2 * R * Math.asin(Math.sqrt(h));
};

const makePathWalker = (path: LngLat[]) => {
	if (path.length < 2)
		throw new Error('Flyover path needs at least two points');
	const cumulative = [0];
	for (let i = 1; i < path.length; i++) {
		cumulative.push(cumulative[i - 1] + havKm(path[i - 1], path[i]));
	}
	const lengthKm = cumulative[cumulative.length - 1];
	const along = (km: number): LngLat => {
		const d = Math.max(0, Math.min(lengthKm, km));
		let i = 1;
		while (i < cumulative.length && cumulative[i] < d) i++;
		if (i >= cumulative.length) return path[path.length - 1];
		const segmentLength = cumulative[i] - cumulative[i - 1] || 1;
		const t = (d - cumulative[i - 1]) / segmentLength;
		return [
			path[i - 1][0] + (path[i][0] - path[i - 1][0]) * t,
			path[i - 1][1] + (path[i][1] - path[i - 1][1]) * t,
		];
	};
	return {along, lengthKm};
};

const bearing = (a: number[], b: number[]) => {
	const r = Math.PI / 180;
	const y = Math.sin((b[0] - a[0]) * r) * Math.cos(b[1] * r);
	const x =
		Math.cos(a[1] * r) * Math.sin(b[1] * r) -
		Math.sin(a[1] * r) * Math.cos(b[1] * r) * Math.cos((b[0] - a[0]) * r);
	return Math.atan2(y, x);
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) =>
	Math.max(lo, Math.min(hi, v));
// Smoothstep — ease-in-out cho cảm giác zoom mượt
const smooth = (t: number) => t * t * (3 - 2 * t);

const loadCesium = () =>
	new Promise<any>((resolve, reject) => {
		if ((window as any).Cesium) return resolve((window as any).Cesium);
		(window as any).CESIUM_BASE_URL = CDN;
		const css = document.createElement('link');
		css.rel = 'stylesheet';
		css.href = `${CDN}Widgets/widgets.css`;
		document.head.appendChild(css);
		const script = document.createElement('script');
		script.src = `${CDN}Cesium.js`;
		script.onload = () => resolve((window as any).Cesium);
		script.onerror = () =>
			reject(new Error(`Failed to load CesiumJS ${CESIUM_VER}`));
		document.head.appendChild(script);
	});

export const CesiumIntroFlythrough: React.FC<CesiumIntroFlythroughProps> = ({
	path,
	introDurationInFrames = 120,
	spaceAltitude = 12_000_000,
	pathSmoothingPasses = 3,
	altitudeStart = 2400,
	altitudeEnd = 1600,
	lookAheadKm = 1.5,
	travelKm = 13,
	pitchFromNadir = 72,
	verticalExaggeration = 1.4,
}) => {
	const containerRef = useRef<HTMLDivElement>(null);
	const started = useRef(false);
	const viewerRef = useRef<any>(null);
	const frame = useCurrentFrame();
	const {durationInFrames, width, height} = useVideoConfig();
	const [ready, setReady] = useState(false);
	const [handle] = useState(() =>
		delayRender('cesium intro init', {timeoutInMilliseconds: 120000}),
	);
	const walker = useMemo(
		() => makePathWalker(smoothFlightPath(path, pathSmoothingPasses)),
		[path, pathSmoothingPasses],
	);

	// Heading + điểm bắt đầu của flythrough — dùng chung cho cả đoạn zoom để nối liền mạch
	const startPoint = useMemo(() => walker.along(0), [walker]);
	const startHeading = useMemo(
		() => bearing(walker.along(0), walker.along(lookAheadKm)),
		[walker, lookAheadKm],
	);
	const flyPitchDeg = -(90 - pitchFromNadir);

	const setCamera = (C: any, viewer: any, currentFrame: number) => {
		if (currentFrame < introDurationInFrames) {
			// ── Giai đoạn 1: zoom từ vũ trụ xuống điểm bắt đầu ──
			const t = smooth(
				introDurationInFrames <= 1
					? 1
					: currentFrame / (introDurationInFrames - 1),
			);
			// Nội suy độ cao theo log → cảm giác lao xuống tự nhiên
			const alt =
				spaceAltitude * Math.pow(altitudeStart / spaceAltitude, t);
			// Pitch: từ nhìn thẳng xuống (-90, nadir) → góc của flythrough
			const pitchDeg = lerp(-90, flyPitchDeg, t);
			viewer.camera.setView({
				destination: C.Cartesian3.fromDegrees(
					startPoint[0],
					startPoint[1],
					alt,
				),
				orientation: {
					heading: startHeading,
					pitch: C.Math.toRadians(pitchDeg),
					roll: 0,
				},
			});
			return;
		}

		// ── Giai đoạn 2: flythrough dọc thung lũng ──
		const flyFrames = durationInFrames - introDurationInFrames;
		const progress =
			flyFrames <= 1
				? 0
				: (currentFrame - introDurationInFrames) / (flyFrames - 1);
		const maxTravel = Math.max(0, walker.lengthKm - lookAheadKm * 2);
		const cameraDistance = Math.min(travelKm, maxTravel) * progress;
		const camera = walker.along(cameraDistance);
		const aim = walker.along(cameraDistance + lookAheadKm);
		const aim2 = walker.along(cameraDistance + lookAheadKm * 2);
		const heading = bearing(camera, aim);
		let headingDelta = bearing(aim, aim2) - heading;
		while (headingDelta > Math.PI) headingDelta -= 2 * Math.PI;
		while (headingDelta < -Math.PI) headingDelta += 2 * Math.PI;
		viewer.camera.setView({
			destination: C.Cartesian3.fromDegrees(
				camera[0],
				camera[1],
				lerp(altitudeStart, altitudeEnd, progress),
			),
			orientation: {
				heading,
				pitch: C.Math.toRadians(flyPitchDeg),
				roll: clamp(headingDelta * BANK_GAIN, -MAX_BANK, MAX_BANK),
			},
		});
	};

	const settle = (viewer: any) =>
		new Promise<void>((resolve) => {
			let stable = 0;
			let ticks = 0;
			const tick = () => {
				viewer.render();
				ticks++;
				stable = viewer.scene.globe.tilesLoaded ? stable + 1 : 0;
				if (stable > 8 || ticks > 600) {
					viewer.render();
					resolve();
				} else {
					setTimeout(tick, 8);
				}
			};
			tick();
		});

	useEffect(() => {
		if (started.current) return;
		started.current = true;
		(async () => {
			if (!MAPTILER_KEY) {
				throw new Error(
					'Set REMOTION_MAPTILER_KEY. Create a key at https://cloud.maptiler.com/account/keys/',
				);
			}
			const C = await loadCesium();
			const viewer = new C.Viewer(containerRef.current, {
				baseLayer: false,
				baseLayerPicker: false,
				geocoder: false,
				homeButton: false,
				sceneModePicker: false,
				navigationHelpButton: false,
				animation: false,
				timeline: false,
				fullscreenButton: false,
				infoBox: false,
				selectionIndicator: false,
				contextOptions: {webgl: {preserveDrawingBuffer: true}},
			});
			viewer.imageryLayers.addImageryProvider(
				new C.UrlTemplateImageryProvider({
					url: `https://api.maptiler.com/tiles/satellite-v2/{z}/{x}/{y}.jpg?key=${MAPTILER_KEY}`,
					maximumLevel: 20,
				}),
			);
			viewer.terrainProvider = await C.CesiumTerrainProvider.fromUrl(
				`https://api.maptiler.com/tiles/terrain-quantized-mesh-v2/?key=${MAPTILER_KEY}`,
				{requestVertexNormals: true},
			);
			viewer.creditDisplay.addStaticCredit(
				new C.Credit(
					'<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a>',
					true,
				),
			);

			viewer.useDefaultRenderLoop = false;
			viewer.scene.skyAtmosphere.show = true;
			viewer.scene.fog.enabled = true;
			viewer.scene.globe.enableLighting = false;
			viewer.scene.verticalExaggeration = verticalExaggeration;
			(window as any).__CESIUM_INTRO__ = {C};
			viewerRef.current = viewer;
			setCamera(C, viewer, 0);
			await settle(viewer);
			setReady(true);
			continueRender(handle);
		})().catch((error) => cancelRender(error));
	}, [handle]);

	useEffect(() => {
		if (!ready) return;
		const frameHandle = delayRender(`cesium intro frame ${frame}`, {
			timeoutInMilliseconds: 60000,
		});
		const C = (window as any).__CESIUM_INTRO__.C;
		const viewer = viewerRef.current;
		setCamera(C, viewer, frame);
		settle(viewer).then(() => continueRender(frameHandle));
	}, [ready, frame]);

	return (
		<AbsoluteFill style={{backgroundColor: '#000'}}>
			<div ref={containerRef} style={{width, height, position: 'absolute'}} />
		</AbsoluteFill>
	);
};
