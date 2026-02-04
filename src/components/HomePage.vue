<template>
  <div class="home-container">
    <!-- 背景粒子效果 -->
    <canvas ref="particleCanvas" class="particle-bg"></canvas>

    <!-- 导航栏 -->
    <nav class="navbar">
      <div class="logo">
        <span class="logo-icon">◈</span>
        <span class="logo-text">LayerAndTree<span class="logo-accent">D</span></span>
      </div>
      <div class="nav-links">
        <a href="#features" class="nav-link">功能特性</a>
        <a href="#map" class="nav-link">地图展示</a>
        <a href="#3d" class="nav-link">3D场景</a>
        <a href="#about" class="nav-link">关于项目</a>
      </div>
    </nav>

    <!-- Hero区域 -->
    <section class="hero">
      <div class="hero-content">
        <div class="hero-badge">工业数字孪生平台</div>
        <h1 class="hero-title">
          <span class="title-line">构建未来</span>
          <span class="title-line gradient-text">工业可视化</span>
          <span class="title-line">智能解决方案</span>
        </h1>
        <p class="hero-desc">
          融合 OpenLayers 地理信息系统与 Three.js 三维渲染技术，
          打造沉浸式工业数字孪生体验，助力企业实现智能化升级转型
        </p>
        <div class="hero-actions">
          <button class="btn-primary" @click="scrollToSection('3d')">
            <span>探索3D场景</span>
            <svg class="btn-arrow" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <button class="btn-secondary" @click="scrollToSection('map')">
            <span>查看地图</span>
          </button>
        </div>
      </div>
      <div class="hero-visual">
        <div class="rotating-cube" ref="heroThreeContainer"></div>
        <div class="visual-glow"></div>
      </div>
    </section>

    <!-- 数据统计 -->
    <section class="stats">
      <div class="stat-item" v-for="(stat, index) in stats" :key="index">
        <div class="stat-value">{{ stat.value }}<span class="stat-unit">{{ stat.unit }}</span></div>
        <div class="stat-label">{{ stat.label }}</div>
        <div class="stat-bar"></div>
      </div>
    </section>

    <!-- 功能特性 -->
    <section id="features" class="features">
      <div class="section-header">
        <span class="section-tag">FEATURES</span>
        <h2 class="section-title">核心功能特性</h2>
        <p class="section-desc">打通地理空间与三维可视化的技术壁垒</p>
      </div>
      <div class="feature-grid">
        <div class="feature-card" v-for="(feature, index) in features" :key="index">
          <div class="feature-icon" v-html="feature.icon"></div>
          <h3 class="feature-title">{{ feature.title }}</h3>
          <p class="feature-desc">{{ feature.desc }}</p>
          <div class="feature-shine"></div>
        </div>
      </div>
    </section>

    <!-- OpenLayers 地图展示 -->
    <section id="map" class="map-section">
      <div class="section-header">
        <span class="section-tag">GIS MAP</span>
        <h2 class="section-title">工业地理信息系统</h2>
        <p class="section-desc">基于 OpenLayers 的高性能地图引擎</p>
      </div>
      <div class="map-container">
        <div ref="mapContainer" class="ol-map"></div>
        <div class="map-overlay">
          <div class="map-info">
            <div class="info-item">
              <span class="info-label">坐标系统</span>
              <span class="info-value">EPSG:3857</span>
            </div>
            <div class="info-item">
              <span class="info-label">当前缩放</span>
              <span class="info-value">{{ mapZoom }}</span>
            </div>
            <div class="info-item">
              <span class="info-label">工厂数量</span>
              <span class="info-value">{{ factoryCount }}</span>
            </div>
          </div>
        </div>
        <div class="map-controls">
          <button class="map-btn" @click="zoomIn" title="放大">
            <svg viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
          <button class="map-btn" @click="zoomOut" title="缩小">
            <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
          <button class="map-btn" @click="resetView" title="重置视图">
            <svg viewBox="0 0 24 24" fill="none"><path d="M3 12a9 9 0 1018 0 9 9 0 10-18 0M3 12h4M12 3v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
    </section>

    <!-- Three.js 3D场景 -->
    <section id="3d" class="three-section">
      <div class="section-header">
        <span class="section-tag">3D VISUALIZATION</span>
        <h2 class="section-title">工业三维场景</h2>
        <p class="section-desc">基于 Three.js 的沉浸式工业模型渲染</p>
      </div>
      <div class="three-container">
        <div ref="threeContainer" class="three-canvas"></div>
        <div class="three-controls">
          <div class="control-group">
            <span class="control-label">场景选择</span>
            <div class="control-buttons">
              <button
                v-for="scene in scenes"
                :key="scene.id"
                :class="['scene-btn', { active: currentScene === scene.id }]"
                @click="switchScene(scene.id)"
              >
                {{ scene.name }}
              </button>
            </div>
          </div>
          <div class="control-group">
            <span class="control-label">渲染模式</span>
            <div class="control-buttons">
              <button
                :class="['mode-btn', { active: wireframe }]"
                @click="toggleWireframe"
              >
                线框
              </button>
              <button
                :class="['mode-btn', { active: !wireframe }]"
                @click="toggleWireframe"
              >
                实体
              </button>
            </div>
          </div>
        </div>
        <div class="three-info">
          <div class="info-row">
            <span class="info-key">FPS</span>
            <span class="info-val">{{ fps }}</span>
          </div>
          <div class="info-row">
            <span class="info-key">顶点数</span>
            <span class="info-val">{{ vertexCount.toLocaleString() }}</span>
          </div>
          <div class="info-row">
            <span class="info-key">三角面</span>
            <span class="info-val">{{ triangleCount.toLocaleString() }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- 项目意义 -->
    <section id="about" class="about-section">
      <div class="about-grid">
        <div class="about-content">
          <span class="section-tag">PROJECT SIGNIFICANCE</span>
          <h2 class="about-title">项目的意义与价值</h2>
          <div class="about-text">
            <p>
              在工业4.0与数字化转型的浪潮中，<strong>可视化技术</strong>正成为连接物理世界与数字世界的关键桥梁。
              本项目致力于构建一个融合GIS地理信息与3D可视化的工业数字孪生平台。
            </p>
            <p>
              通过 <strong>OpenLayers</strong> 强大的地图渲染能力，我们能够精准定位工厂设施、
              监控物流动态、分析区域布局；而 <strong>Three.js</strong> 则赋予我们将工业设备、
              生产线、仓储设施以三维形式呈现的能力，实现真正的"所见即所得"。
            </p>
            <p>
              这不仅是技术的融合，更是<strong>认知方式的革新</strong>——从平面到立体，
              从静态到动态，从单点到全局，帮助决策者以更直观、更全面的视角把握工业全貌。
            </p>
          </div>
          <div class="about-values">
            <div class="value-item" v-for="(value, index) in values" :key="index">
              <div class="value-number">{{ String(index + 1).padStart(2, '0') }}</div>
              <div class="value-content">
                <h4>{{ value.title }}</h4>
                <p>{{ value.desc }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="about-visual">
          <div class="visual-card">
            <div class="card-glow"></div>
            <div class="card-content">
              <div class="tech-stack">
                <div class="tech-item" v-for="tech in techStack" :key="tech.name">
                  <div class="tech-icon" v-html="tech.icon"></div>
                  <span class="tech-name">{{ tech.name }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 页脚 -->
    <footer class="footer">
      <div class="footer-content">
        <div class="footer-brand">
          <span class="logo-icon">◈</span>
          <span>LayerAndTreeD</span>
        </div>
        <div class="footer-text">
          工业数字孪生可视化平台 · 基于 Vue 3 + OpenLayers + Three.js
        </div>
        <div class="footer-links">
          <a href="#">文档</a>
          <a href="#">GitHub</a>
          <a href="#">联系我们</a>
        </div>
      </div>
      <div class="footer-bottom">
        <span>© 2025 LayerAndTreeD. All rights reserved.</span>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, shallowRef, markRaw } from 'vue';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import { fromLonLat } from 'ol/proj';
import { Style, Circle as CircleStyle, Fill, Stroke } from 'ol/style';
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// 响应式数据
const mapContainer = ref<HTMLDivElement | null>(null);
const threeContainer = ref<HTMLDivElement | null>(null);
const heroThreeContainer = ref<HTMLDivElement | null>(null);
const particleCanvas = ref<HTMLCanvasElement | null>(null);
const mapZoom = ref(6);
const factoryCount = ref(12);
const currentScene = ref('factory');
const wireframe = ref(false);
const fps = ref(60);
const vertexCount = ref(0);
const triangleCount = ref(0);

// 使用 shallowRef 避免深度响应
const olMap = shallowRef<Map | null>(null);
const threeScene = shallowRef<THREE.Scene | null>(null);
const threeCamera = shallowRef<THREE.PerspectiveCamera | null>(null);
const threeRenderer = shallowRef<THREE.WebGLRenderer | null>(null);
const threeControls = shallowRef<OrbitControls | null>(null);

// 静态数据
const stats = [
  { value: '99.9', unit: '%', label: '系统可用性' },
  { value: '50', unit: 'ms', label: '响应延迟' },
  { value: '1M', unit: '+', label: '数据点支持' },
  { value: '60', unit: 'fps', label: '渲染帧率' },
];

const features = [
  {
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1118 0z" stroke="currentColor" stroke-width="1.5"/><circle cx="12" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/></svg>',
    title: '精准定位',
    desc: '基于高精度坐标系统，实现厂区设施毫米级定位追踪',
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    title: '多图层叠加',
    desc: '支持卫星影像、矢量地图、热力图等多种图层混合渲染',
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" stroke="currentColor" stroke-width="1.5"/><path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12" stroke="currentColor" stroke-width="1.5"/></svg>',
    title: '3D建模',
    desc: '工业设备三维模型精细还原，支持实时光影与材质渲染',
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    title: '实时监控',
    desc: '数据流实时可视化，设备状态一目了然',
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" stroke-width="1.5"/></svg>',
    title: '交互操作',
    desc: '支持缩放、旋转、点选等丰富的用户交互方式',
  },
  {
    icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    title: '高性能',
    desc: 'WebGL硬件加速渲染，支持百万级数据点流畅展示',
  },
];

const scenes = [
  { id: 'factory', name: '工厂设备' },
  { id: 'pipeline', name: '管道系统' },
  { id: 'warehouse', name: '仓储物流' },
];

const values = [
  { title: '降本增效', desc: '通过可视化监控减少人工巡检成本，提升运维效率' },
  { title: '风险预警', desc: '实时数据分析，异常状态提前预警，降低事故风险' },
  { title: '决策支撑', desc: '全局视角呈现，为管理层提供数据驱动的决策依据' },
  { title: '知识沉淀', desc: '数字孪生模型积累，形成企业数字化资产' },
];

const techStack = [
  { name: 'Vue 3', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 3h3.5L12 15l6.5-12H22L12 21 2 3zm4.5 0h3L12 8l2.5-5h3L12 13 6.5 3z"/></svg>' },
  { name: 'TypeScript', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"/></svg>' },
  { name: 'OpenLayers', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10"/></svg>' },
  { name: 'Three.js', icon: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.38 0a.268.268 0 0 0-.256.332l2.894 11.716a.268.268 0 0 0 .01.04l2.89 11.708a.268.268 0 0 0 .447.128L23.802 7.15a.268.268 0 0 0-.112-.45L12.19.065a.268.268 0 0 0-.112-.016L.4 0zm.374.654L11.857.972l-8.124 2.54zm12.2.391 10.945 3.313L6.17 13.19zm-11.275 2.87 8.373-2.618L2.293 15.683zm9.125-2.253 6.635 14.23L2.912 16.3zm7.292 14.817L6.632 22.92l-.695-2.816z"/></svg>' },
];

// 工厂位置数据
const factoryLocations = [
  { name: '北京智能工厂', coords: [116.4074, 39.9042] },
  { name: '上海制造中心', coords: [121.4737, 31.2304] },
  { name: '深圳科技园', coords: [114.0579, 22.5431] },
  { name: '广州物流基地', coords: [113.2644, 23.1291] },
  { name: '成都研发中心', coords: [104.0665, 30.5723] },
  { name: '武汉生产线', coords: [114.3055, 30.5928] },
  { name: '西安装配厂', coords: [108.9402, 34.3416] },
  { name: '杭州数据中心', coords: [120.1551, 30.2741] },
  { name: '南京仓储中心', coords: [118.7969, 32.0603] },
  { name: '天津港口工厂', coords: [117.1906, 39.1256] },
  { name: '重庆制造基地', coords: [106.5516, 29.563] },
  { name: '青岛海运中心', coords: [120.3826, 36.0671] },
];

let animationFrameId: number | null = null;
let heroAnimationId: number | null = null;
let particleAnimationId: number | null = null;

// 初始化粒子背景
function initParticleBackground(): void {
  const canvas = particleCanvas.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const resizeCanvas = (): void => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    alpha: number;
  }

  const particles: Particle[] = [];
  const particleCount = 80;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      size: Math.random() * 2 + 1,
      alpha: Math.random() * 0.5 + 0.2,
    });
  }

  const animate = (): void => {
    ctx.fillStyle = 'rgba(10, 15, 25, 0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, index) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 212, 255, ${particle.alpha})`;
      ctx.fill();

      // 连接附近粒子
      particles.slice(index + 1).forEach((otherParticle) => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < 150) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(otherParticle.x, otherParticle.y);
          ctx.strokeStyle = `rgba(0, 212, 255, ${0.1 * (1 - distance / 150)})`;
          ctx.stroke();
        }
      });
    });

    particleAnimationId = requestAnimationFrame(animate);
  };

  animate();
}

// 初始化 OpenLayers 地图
function initMap(): void {
  if (!mapContainer.value) return;

  // 创建工厂标记图层
  const factoryFeatures = factoryLocations.map((factory) => {
    const feature = new Feature({
      geometry: new Point(fromLonLat(factory.coords)),
      name: factory.name,
    });
    return feature;
  });

  const vectorSource = new VectorSource({
    features: factoryFeatures,
  });

  const vectorLayer = new VectorLayer({
    source: vectorSource,
    style: new Style({
      image: new CircleStyle({
        radius: 8,
        fill: new Fill({ color: 'rgba(0, 212, 255, 0.8)' }),
        stroke: new Stroke({ color: '#00d4ff', width: 2 }),
      }),
    }),
  });

  const map = markRaw(new Map({
    target: mapContainer.value,
    layers: [
      new TileLayer({
        source: new OSM(),
      }),
      vectorLayer,
    ],
    view: new View({
      center: fromLonLat([108, 34]),
      zoom: 4.5,
    }),
  }));

  map.getView().on('change:resolution', () => {
    mapZoom.value = Math.round(map.getView().getZoom() || 4);
  });

  olMap.value = map;
}

// 地图控制方法
function zoomIn(): void {
  const map = olMap.value;
  if (map) {
    const view = map.getView();
    view.animate({ zoom: (view.getZoom() || 4) + 1, duration: 250 });
  }
}

function zoomOut(): void {
  const map = olMap.value;
  if (map) {
    const view = map.getView();
    view.animate({ zoom: (view.getZoom() || 4) - 1, duration: 250 });
  }
}

function resetView(): void {
  const map = olMap.value;
  if (map) {
    const view = map.getView();
    view.animate({ center: fromLonLat([108, 34]), zoom: 4.5, duration: 500 });
  }
}

// 初始化 Three.js 场景
function initThreeScene(): void {
  if (!threeContainer.value) return;

  const container = threeContainer.value;
  const width = container.clientWidth;
  const height = container.clientHeight;

  // 创建场景
  const scene = markRaw(new THREE.Scene());
  scene.background = new THREE.Color(0x0a0f19);
  scene.fog = new THREE.Fog(0x0a0f19, 20, 100);

  // 创建相机
  const camera = markRaw(new THREE.PerspectiveCamera(60, width / height, 0.1, 1000));
  camera.position.set(15, 12, 15);

  // 创建渲染器
  const renderer = markRaw(new THREE.WebGLRenderer({ antialias: true }));
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // 添加控制器
  const controls = markRaw(new OrbitControls(camera, renderer.domElement));
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.maxPolarAngle = Math.PI / 2;

  // 添加灯光
  const ambientLight = new THREE.AmbientLight(0x404040, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
  directionalLight.position.set(10, 20, 10);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  scene.add(directionalLight);

  const pointLight1 = new THREE.PointLight(0x00d4ff, 1, 50);
  pointLight1.position.set(-10, 10, -10);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x7c3aed, 0.8, 50);
  pointLight2.position.set(10, 5, 10);
  scene.add(pointLight2);

  // 添加地面网格
  const gridHelper = new THREE.GridHelper(50, 50, 0x00d4ff, 0x1a2744);
  scene.add(gridHelper);

  // 创建工厂场景
  createFactoryScene(scene);

  threeScene.value = scene;
  threeCamera.value = camera;
  threeRenderer.value = renderer;
  threeControls.value = controls;

  // 更新统计信息
  updateStats(scene);

  // 动画循环
  let lastTime = performance.now();
  let frameCount = 0;

  const animate = (): void => {
    animationFrameId = requestAnimationFrame(animate);

    // 计算 FPS
    frameCount++;
    const currentTime = performance.now();
    if (currentTime - lastTime >= 1000) {
      fps.value = frameCount;
      frameCount = 0;
      lastTime = currentTime;
    }

    controls.update();
    renderer.render(scene, camera);
  };

  animate();

  // 响应窗口大小变化
  const handleResize = (): void => {
    const newWidth = container.clientWidth;
    const newHeight = container.clientHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
  };

  window.addEventListener('resize', handleResize);
}

// 创建工厂场景
function createFactoryScene(scene: THREE.Scene): void {
  // 清除现有对象（保留灯光和网格）
  const objectsToRemove = scene.children.filter(
    (child) => child.type === 'Mesh' || child.type === 'Group'
  );
  objectsToRemove.forEach((obj) => scene.remove(obj));

  const materials = {
    metal: new THREE.MeshStandardMaterial({
      color: 0x4a5568,
      metalness: 0.8,
      roughness: 0.2,
      wireframe: wireframe.value,
    }),
    accent: new THREE.MeshStandardMaterial({
      color: 0x00d4ff,
      metalness: 0.5,
      roughness: 0.3,
      emissive: 0x00d4ff,
      emissiveIntensity: 0.2,
      wireframe: wireframe.value,
    }),
    warning: new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.3,
      roughness: 0.5,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.3,
      wireframe: wireframe.value,
    }),
  };

  // 主建筑
  const buildingGeometry = new THREE.BoxGeometry(8, 6, 12);
  const building = new THREE.Mesh(buildingGeometry, materials.metal);
  building.position.set(0, 3, 0);
  building.castShadow = true;
  building.receiveShadow = true;
  scene.add(building);

  // 烟囱
  const chimneyGeometry = new THREE.CylinderGeometry(0.8, 1, 8, 16);
  const chimney1 = new THREE.Mesh(chimneyGeometry, materials.metal);
  chimney1.position.set(-2, 10, 3);
  chimney1.castShadow = true;
  scene.add(chimney1);

  const chimney2 = new THREE.Mesh(chimneyGeometry, materials.metal);
  chimney2.position.set(-2, 10, -3);
  chimney2.castShadow = true;
  scene.add(chimney2);

  // 储罐
  const tankGeometry = new THREE.CylinderGeometry(2.5, 2.5, 5, 32);
  const tank1 = new THREE.Mesh(tankGeometry, materials.accent);
  tank1.position.set(10, 2.5, 0);
  tank1.castShadow = true;
  scene.add(tank1);

  const tank2 = new THREE.Mesh(tankGeometry, materials.accent);
  tank2.position.set(10, 2.5, 7);
  tank2.castShadow = true;
  scene.add(tank2);

  // 管道
  const pipeGeometry = new THREE.CylinderGeometry(0.3, 0.3, 10, 16);
  const pipe1 = new THREE.Mesh(pipeGeometry, materials.warning);
  pipe1.rotation.z = Math.PI / 2;
  pipe1.position.set(5, 4, 0);
  scene.add(pipe1);

  const pipe2 = new THREE.Mesh(pipeGeometry, materials.warning);
  pipe2.rotation.x = Math.PI / 2;
  pipe2.position.set(10, 4, 3.5);
  pipe2.scale.y = 0.7;
  scene.add(pipe2);

  // 传送带支架
  const conveyorGeometry = new THREE.BoxGeometry(15, 0.3, 1.5);
  const conveyor = new THREE.Mesh(conveyorGeometry, materials.metal);
  conveyor.position.set(-8, 1.5, 0);
  conveyor.rotation.z = 0.1;
  scene.add(conveyorGeometry);

  // 控制室
  const controlRoomGeometry = new THREE.BoxGeometry(4, 3, 4);
  const controlRoom = new THREE.Mesh(controlRoomGeometry, materials.metal);
  controlRoom.position.set(-12, 1.5, 8);
  controlRoom.castShadow = true;
  scene.add(controlRoom);

  // 起重机
  const craneBaseGeometry = new THREE.BoxGeometry(2, 0.5, 2);
  const craneBase = new THREE.Mesh(craneBaseGeometry, materials.warning);
  craneBase.position.set(0, 0.25, -12);
  scene.add(craneBase);

  const craneTowerGeometry = new THREE.BoxGeometry(0.5, 12, 0.5);
  const craneTower = new THREE.Mesh(craneTowerGeometry, materials.metal);
  craneTower.position.set(0, 6.5, -12);
  scene.add(craneTower);

  const craneArmGeometry = new THREE.BoxGeometry(10, 0.4, 0.4);
  const craneArm = new THREE.Mesh(craneArmGeometry, materials.accent);
  craneArm.position.set(5, 12, -12);
  scene.add(craneArm);

  updateStats(scene);
}

// 创建管道场景
function createPipelineScene(scene: THREE.Scene): void {
  const objectsToRemove = scene.children.filter(
    (child) => child.type === 'Mesh' || child.type === 'Group'
  );
  objectsToRemove.forEach((obj) => scene.remove(obj));

  const pipeMaterial = new THREE.MeshStandardMaterial({
    color: 0x00d4ff,
    metalness: 0.7,
    roughness: 0.3,
    wireframe: wireframe.value,
  });

  const valveMaterial = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.5,
    roughness: 0.4,
    wireframe: wireframe.value,
  });

  // 主管道网络
  const positions = [
    { start: [-15, 2, 0], end: [15, 2, 0] },
    { start: [0, 2, -10], end: [0, 2, 10] },
    { start: [-10, 2, -10], end: [-10, 2, 10] },
    { start: [10, 2, -10], end: [10, 2, 10] },
    { start: [-15, 2, -5], end: [15, 2, -5] },
    { start: [-15, 2, 5], end: [15, 2, 5] },
  ];

  positions.forEach((pos) => {
    const start = new THREE.Vector3(...pos.start as [number, number, number]);
    const end = new THREE.Vector3(...pos.end as [number, number, number]);
    const length = start.distanceTo(end);
    const direction = end.clone().sub(start).normalize();

    const pipeGeometry = new THREE.CylinderGeometry(0.4, 0.4, length, 16);
    const pipe = new THREE.Mesh(pipeGeometry, pipeMaterial);

    pipe.position.copy(start.clone().add(end).divideScalar(2));
    pipe.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction);
    scene.add(pipe);
  });

  // 阀门
  const valvePositions = [
    [0, 2, 0], [-10, 2, 0], [10, 2, 0],
    [0, 2, 5], [0, 2, -5],
    [-10, 2, 5], [10, 2, -5],
  ];

  valvePositions.forEach((pos) => {
    const valveGeometry = new THREE.TorusGeometry(0.8, 0.2, 16, 32);
    const valve = new THREE.Mesh(valveGeometry, valveMaterial);
    valve.position.set(pos[0], pos[1], pos[2]);
    valve.rotation.x = Math.PI / 2;
    scene.add(valve);
  });

  // 泵站
  const pumpGeometry = new THREE.CylinderGeometry(1.5, 1.5, 3, 32);
  const pump1 = new THREE.Mesh(pumpGeometry, pipeMaterial);
  pump1.position.set(-15, 1.5, 0);
  scene.add(pump1);

  const pump2 = new THREE.Mesh(pumpGeometry, pipeMaterial);
  pump2.position.set(15, 1.5, 0);
  scene.add(pump2);

  updateStats(scene);
}

// 创建仓储场景
function createWarehouseScene(scene: THREE.Scene): void {
  const objectsToRemove = scene.children.filter(
    (child) => child.type === 'Mesh' || child.type === 'Group'
  );
  objectsToRemove.forEach((obj) => scene.remove(obj));

  const shelfMaterial = new THREE.MeshStandardMaterial({
    color: 0x4a5568,
    metalness: 0.6,
    roughness: 0.4,
    wireframe: wireframe.value,
  });

  const boxMaterial = new THREE.MeshStandardMaterial({
    color: 0x00d4ff,
    metalness: 0.3,
    roughness: 0.6,
    wireframe: wireframe.value,
  });

  const forkliftMaterial = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.4,
    roughness: 0.5,
    wireframe: wireframe.value,
  });

  // 货架
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      const shelfGroup = new THREE.Group();

      // 货架框架
      const frameGeometry = new THREE.BoxGeometry(4, 8, 1.5);
      const frame = new THREE.Mesh(frameGeometry, shelfMaterial);
      frame.position.y = 4;
      shelfGroup.add(frame);

      // 货物盒子
      for (let level = 0; level < 4; level++) {
        for (let box = 0; box < 3; box++) {
          const boxGeometry = new THREE.BoxGeometry(1, 1.2, 1);
          const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
          boxMesh.position.set(-1.2 + box * 1.2, 1 + level * 2, 0);
          shelfGroup.add(boxMesh);
        }
      }

      shelfGroup.position.set(-9 + col * 6, 0, -6 + row * 6);
      scene.add(shelfGroup);
    }
  }

  // 叉车
  const forkliftBody = new THREE.BoxGeometry(2, 1.5, 3);
  const forklift = new THREE.Mesh(forkliftBody, forkliftMaterial);
  forklift.position.set(12, 0.75, 0);
  scene.add(forklift);

  // 叉车货叉
  const forkGeometry = new THREE.BoxGeometry(0.1, 0.1, 2);
  const fork1 = new THREE.Mesh(forkGeometry, shelfMaterial);
  fork1.position.set(11.5, 0.3, -1.5);
  scene.add(fork1);

  const fork2 = new THREE.Mesh(forkGeometry, shelfMaterial);
  fork2.position.set(12.5, 0.3, -1.5);
  scene.add(fork2);

  updateStats(scene);
}

// 更新场景统计
function updateStats(scene: THREE.Scene): void {
  let vertices = 0;
  let triangles = 0;

  scene.traverse((object) => {
    if (object instanceof THREE.Mesh) {
      const geometry = object.geometry;
      if (geometry.index !== null) {
        triangles += geometry.index.count / 3;
      } else if (geometry.attributes.position) {
        triangles += geometry.attributes.position.count / 3;
      }
      if (geometry.attributes.position) {
        vertices += geometry.attributes.position.count;
      }
    }
  });

  vertexCount.value = vertices;
  triangleCount.value = triangles;
}

// 切换场景
function switchScene(sceneId: string): void {
  currentScene.value = sceneId;
  const scene = threeScene.value;
  if (!scene) return;

  switch (sceneId) {
    case 'factory':
      createFactoryScene(scene);
      break;
    case 'pipeline':
      createPipelineScene(scene);
      break;
    case 'warehouse':
      createWarehouseScene(scene);
      break;
  }
}

// 切换线框模式
function toggleWireframe(): void {
  wireframe.value = !wireframe.value;
  switchScene(currentScene.value);
}

// 初始化 Hero 区域的 3D 立方体
function initHeroCube(): void {
  if (!heroThreeContainer.value) return;

  const container = heroThreeContainer.value;
  const size = Math.min(container.clientWidth, container.clientHeight);

  const scene = markRaw(new THREE.Scene());
  const camera = markRaw(new THREE.PerspectiveCamera(50, 1, 0.1, 100));
  camera.position.z = 5;

  const renderer = markRaw(new THREE.WebGLRenderer({ antialias: true, alpha: true }));
  renderer.setSize(size, size);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // 创建发光立方体
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x00d4ff });
  const wireframeCube = new THREE.LineSegments(edges, lineMaterial);
  scene.add(wireframeCube);

  // 内部发光核心
  const coreGeometry = new THREE.IcosahedronGeometry(0.8, 1);
  const coreMaterial = new THREE.MeshBasicMaterial({
    color: 0x7c3aed,
    wireframe: true,
  });
  const core = new THREE.Mesh(coreGeometry, coreMaterial);
  scene.add(core);

  // 外部环
  const ringGeometry = new THREE.TorusGeometry(1.5, 0.05, 16, 100);
  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
  const ring1 = new THREE.Mesh(ringGeometry, ringMaterial);
  scene.add(ring1);

  const ring2 = new THREE.Mesh(ringGeometry, ringMaterial);
  ring2.rotation.x = Math.PI / 2;
  scene.add(ring2);

  const ring3 = new THREE.Mesh(ringGeometry, ringMaterial);
  ring3.rotation.y = Math.PI / 2;
  scene.add(ring3);

  const animate = (): void => {
    heroAnimationId = requestAnimationFrame(animate);

    wireframeCube.rotation.x += 0.005;
    wireframeCube.rotation.y += 0.01;

    core.rotation.x -= 0.01;
    core.rotation.y -= 0.015;

    ring1.rotation.z += 0.008;
    ring2.rotation.x += 0.008;
    ring3.rotation.y += 0.008;

    renderer.render(scene, camera);
  };

  animate();
}

// 滚动到指定区域
function scrollToSection(sectionId: string): void {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

onMounted(() => {
  initParticleBackground();
  initHeroCube();
  initMap();
  initThreeScene();
});

onUnmounted(() => {
  if (animationFrameId) cancelAnimationFrame(animationFrameId);
  if (heroAnimationId) cancelAnimationFrame(heroAnimationId);
  if (particleAnimationId) cancelAnimationFrame(particleAnimationId);

  const map = olMap.value;
  if (map) map.setTarget(undefined);

  const renderer = threeRenderer.value;
  if (renderer) renderer.dispose();
});
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&family=Rajdhani:wght@300;400;500;600;700&display=swap');

.home-container {
  --color-bg: #0a0f19;
  --color-bg-secondary: #111827;
  --color-accent: #00d4ff;
  --color-accent-secondary: #7c3aed;
  --color-text: #e5e7eb;
  --color-text-muted: #9ca3af;
  --color-border: #1f2937;
  --font-display: 'Orbitron', sans-serif;
  --font-body: 'Rajdhani', sans-serif;

  min-height: 100vh;
  background: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  overflow-x: hidden;
  position: relative;
}

.particle-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  pointer-events: none;
}

/* 导航栏 */
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 3rem;
  background: rgba(10, 15, 25, 0.8);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid rgba(0, 212, 255, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.25rem;
}

.logo-icon {
  color: var(--color-accent);
  font-size: 1.5rem;
  animation: pulse 2s ease-in-out infinite;
}

.logo-text {
  letter-spacing: 0.05em;
}

.logo-accent {
  color: var(--color-accent);
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: var(--color-text-muted);
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  letter-spacing: 0.05em;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-secondary));
  transition: width 0.3s ease;
}

.nav-link:hover {
  color: var(--color-accent);
}

.nav-link:hover::after {
  width: 100%;
}

/* Hero 区域 */
.hero {
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  padding: 8rem 5rem 4rem;
  gap: 4rem;
}

.hero-content {
  max-width: 600px;
}

.hero-badge {
  display: inline-block;
  padding: 0.5rem 1.25rem;
  background: linear-gradient(135deg, rgba(0, 212, 255, 0.15), rgba(124, 58, 237, 0.15));
  border: 1px solid rgba(0, 212, 255, 0.3);
  border-radius: 100px;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  color: var(--color-accent);
  margin-bottom: 1.5rem;
  animation: fadeInUp 0.8s ease-out;
}

.hero-title {
  font-family: var(--font-display);
  font-size: 3.5rem;
  font-weight: 800;
  line-height: 1.1;
  margin: 0 0 1.5rem;
}

.title-line {
  display: block;
  animation: fadeInUp 0.8s ease-out;
  animation-fill-mode: both;
}

.title-line:nth-child(1) { animation-delay: 0.1s; }
.title-line:nth-child(2) { animation-delay: 0.2s; }
.title-line:nth-child(3) { animation-delay: 0.3s; }

.gradient-text {
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-secondary));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-desc {
  font-size: 1.15rem;
  line-height: 1.7;
  color: var(--color-text-muted);
  margin-bottom: 2.5rem;
  animation: fadeInUp 0.8s ease-out 0.4s both;
}

.hero-actions {
  display: flex;
  gap: 1rem;
  animation: fadeInUp 0.8s ease-out 0.5s both;
}

.btn-primary,
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  font-family: var(--font-body);
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-secondary));
  color: var(--color-bg);
  border: none;
  box-shadow: 0 4px 20px rgba(0, 212, 255, 0.3);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 30px rgba(0, 212, 255, 0.5);
}

.btn-arrow {
  width: 20px;
  height: 20px;
  transition: transform 0.3s ease;
}

.btn-primary:hover .btn-arrow {
  transform: translateX(4px);
}

.btn-secondary {
  background: transparent;
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.hero-visual {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.rotating-cube {
  width: 400px;
  height: 400px;
  animation: fadeIn 1s ease-out 0.6s both;
}

.visual-glow {
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(0, 212, 255, 0.3) 0%, transparent 70%);
  filter: blur(60px);
  animation: pulse 3s ease-in-out infinite;
}

/* 数据统计 */
.stats {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  padding: 4rem 5rem;
  background: linear-gradient(180deg, transparent, rgba(0, 212, 255, 0.03));
  border-top: 1px solid var(--color-border);
  border-bottom: 1px solid var(--color-border);
}

.stat-item {
  text-align: center;
  padding: 2rem;
  background: rgba(17, 24, 39, 0.5);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.stat-item:hover {
  border-color: var(--color-accent);
  transform: translateY(-4px);
}

.stat-value {
  font-family: var(--font-display);
  font-size: 3rem;
  font-weight: 800;
  color: var(--color-accent);
}

.stat-unit {
  font-size: 1.5rem;
  color: var(--color-text-muted);
  margin-left: 0.25rem;
}

.stat-label {
  font-size: 0.95rem;
  color: var(--color-text-muted);
  margin-top: 0.5rem;
  letter-spacing: 0.05em;
}

.stat-bar {
  width: 60px;
  height: 3px;
  background: linear-gradient(90deg, var(--color-accent), var(--color-accent-secondary));
  margin: 1rem auto 0;
  border-radius: 2px;
}

/* 通用区块样式 */
.section-header {
  text-align: center;
  margin-bottom: 4rem;
}

.section-tag {
  display: inline-block;
  font-family: var(--font-display);
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: var(--color-accent);
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 212, 255, 0.1);
  border-radius: 4px;
}

.section-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 1rem;
}

.section-desc {
  font-size: 1.1rem;
  color: var(--color-text-muted);
}

/* 功能特性 */
.features {
  position: relative;
  z-index: 1;
  padding: 6rem 5rem;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.feature-card {
  position: relative;
  padding: 2.5rem;
  background: var(--color-bg-secondary);
  border-radius: 16px;
  border: 1px solid var(--color-border);
  overflow: hidden;
  transition: all 0.4s ease;
}

.feature-card:hover {
  transform: translateY(-8px);
  border-color: var(--color-accent);
}

.feature-card:hover .feature-shine {
  transform: translateX(100%);
}

.feature-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(0, 212, 255, 0.1), transparent);
  transition: transform 0.6s ease;
}

.feature-icon {
  width: 48px;
  height: 48px;
  margin-bottom: 1.5rem;
  color: var(--color-accent);
}

.feature-icon svg {
  width: 100%;
  height: 100%;
}

.feature-title {
  font-family: var(--font-display);
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 1rem;
}

.feature-desc {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--color-text-muted);
  margin: 0;
}

/* 地图区域 */
.map-section {
  position: relative;
  z-index: 1;
  padding: 6rem 5rem;
  background: linear-gradient(180deg, rgba(0, 212, 255, 0.02), transparent);
}

.map-container {
  position: relative;
  height: 600px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--color-border);
}

.ol-map {
  width: 100%;
  height: 100%;
}

.map-overlay {
  position: absolute;
  top: 1.5rem;
  left: 1.5rem;
  background: rgba(10, 15, 25, 0.9);
  backdrop-filter: blur(10px);
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.map-info {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.info-item {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
}

.info-label {
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

.info-value {
  font-family: var(--font-display);
  color: var(--color-accent);
  font-weight: 600;
}

.map-controls {
  position: absolute;
  right: 1.5rem;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.map-btn {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 15, 25, 0.9);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.map-btn svg {
  width: 20px;
  height: 20px;
  color: var(--color-text);
}

.map-btn:hover {
  border-color: var(--color-accent);
  background: rgba(0, 212, 255, 0.1);
}

.map-btn:hover svg {
  color: var(--color-accent);
}

/* Three.js 区域 */
.three-section {
  position: relative;
  z-index: 1;
  padding: 6rem 5rem;
}

.three-container {
  position: relative;
  height: 700px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid var(--color-border);
  background: var(--color-bg-secondary);
}

.three-canvas {
  width: 100%;
  height: 100%;
}

.three-controls {
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
  padding: 1rem 2rem;
  background: rgba(10, 15, 25, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.control-group {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.control-label {
  font-size: 0.85rem;
  color: var(--color-text-muted);
  white-space: nowrap;
}

.control-buttons {
  display: flex;
  gap: 0.5rem;
}

.scene-btn,
.mode-btn {
  padding: 0.5rem 1rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  font-weight: 500;
  background: transparent;
  border: 1px solid var(--color-border);
  border-radius: 6px;
  color: var(--color-text-muted);
  cursor: pointer;
  transition: all 0.3s ease;
}

.scene-btn:hover,
.mode-btn:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

.scene-btn.active,
.mode-btn.active {
  background: var(--color-accent);
  border-color: var(--color-accent);
  color: var(--color-bg);
}

.three-info {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 1rem 1.5rem;
  background: rgba(10, 15, 25, 0.9);
  backdrop-filter: blur(10px);
  border-radius: 12px;
  border: 1px solid var(--color-border);
}

.info-row {
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  padding: 0.25rem 0;
}

.info-key {
  font-size: 0.8rem;
  color: var(--color-text-muted);
}

.info-val {
  font-family: var(--font-display);
  font-size: 0.85rem;
  color: var(--color-accent);
  font-weight: 600;
}

/* 关于项目 */
.about-section {
  position: relative;
  z-index: 1;
  padding: 6rem 5rem;
  background: linear-gradient(180deg, transparent, rgba(124, 58, 237, 0.03));
}

.about-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 4rem;
  align-items: start;
}

.about-content .section-tag {
  margin-bottom: 1.5rem;
}

.about-title {
  font-family: var(--font-display);
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0 0 2rem;
}

.about-text {
  margin-bottom: 3rem;
}

.about-text p {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--color-text-muted);
  margin: 0 0 1.5rem;
}

.about-text strong {
  color: var(--color-accent);
  font-weight: 600;
}

.about-values {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.value-item {
  display: flex;
  gap: 1.5rem;
  padding: 1.5rem;
  background: var(--color-bg-secondary);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.value-item:hover {
  border-color: var(--color-accent-secondary);
  transform: translateX(8px);
}

.value-number {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--color-accent-secondary);
  opacity: 0.5;
}

.value-content h4 {
  font-family: var(--font-display);
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 0.5rem;
}

.value-content p {
  font-size: 0.9rem;
  color: var(--color-text-muted);
  margin: 0;
  line-height: 1.6;
}

.about-visual {
  position: sticky;
  top: 120px;
}

.visual-card {
  position: relative;
  padding: 3rem;
  background: var(--color-bg-secondary);
  border-radius: 20px;
  border: 1px solid var(--color-border);
  overflow: hidden;
}

.card-glow {
  position: absolute;
  top: -50%;
  right: -50%;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(124, 58, 237, 0.2) 0%, transparent 60%);
  pointer-events: none;
}

.tech-stack {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.tech-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  border-radius: 12px;
  border: 1px solid var(--color-border);
  transition: all 0.3s ease;
}

.tech-item:hover {
  border-color: var(--color-accent);
  transform: scale(1.05);
}

.tech-icon {
  width: 40px;
  height: 40px;
  color: var(--color-accent);
}

.tech-icon svg {
  width: 100%;
  height: 100%;
}

.tech-name {
  font-family: var(--font-display);
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}

/* 页脚 */
.footer {
  position: relative;
  z-index: 1;
  padding: 4rem 5rem 2rem;
  background: var(--color-bg-secondary);
  border-top: 1px solid var(--color-border);
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2rem;
  border-bottom: 1px solid var(--color-border);
}

.footer-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.1rem;
}

.footer-brand .logo-icon {
  color: var(--color-accent);
}

.footer-text {
  color: var(--color-text-muted);
  font-size: 0.9rem;
}

.footer-links {
  display: flex;
  gap: 2rem;
}

.footer-links a {
  color: var(--color-text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: var(--color-accent);
}

.footer-bottom {
  padding-top: 2rem;
  text-align: center;
  color: var(--color-text-muted);
  font-size: 0.85rem;
}

/* 动画 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

/* 响应式 */
@media (max-width: 1200px) {
  .hero {
    grid-template-columns: 1fr;
    text-align: center;
    padding: 6rem 2rem 3rem;
  }

  .hero-content {
    max-width: 100%;
  }

  .hero-actions {
    justify-content: center;
  }

  .hero-visual {
    order: -1;
  }

  .rotating-cube {
    width: 300px;
    height: 300px;
  }

  .feature-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .about-grid {
    grid-template-columns: 1fr;
  }

  .about-visual {
    position: relative;
    top: 0;
  }
}

@media (max-width: 768px) {
  .navbar {
    padding: 1rem 1.5rem;
  }

  .nav-links {
    display: none;
  }

  .hero-title {
    font-size: 2.5rem;
  }

  .stats {
    grid-template-columns: repeat(2, 1fr);
    padding: 3rem 2rem;
  }

  .features,
  .map-section,
  .three-section,
  .about-section {
    padding: 4rem 2rem;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .map-container,
  .three-container {
    height: 450px;
  }

  .three-controls {
    flex-direction: column;
    gap: 1rem;
    width: calc(100% - 3rem);
  }

  .footer-content {
    flex-direction: column;
    gap: 1.5rem;
    text-align: center;
  }
}
</style>
