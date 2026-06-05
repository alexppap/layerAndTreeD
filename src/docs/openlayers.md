# OpenLayers 集成

LayerAndTreeD 使用 OpenLayers 提供地理信息系统能力。本页介绍地图初始化与常用图层操作。

## 创建地图实例

```ts
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

const map = new Map({
  target: 'map',
  layers: [new TileLayer({ source: new OSM() })],
  view: new View({
    center: [12950000, 4860000],
    zoom: 5,
  }),
});
```

## 图层管理

### 添加矢量图层

矢量图层用于渲染工厂位置等点位标记：

```ts
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';

const markerLayer = new VectorLayer({
  source: new VectorSource(),
});
map.addLayer(markerLayer);
```

### 切换底图

平台支持 OSM、高德、百度等多种底图，可通过替换 `source` 实现切换。

## 交互事件

监听地图点击以获取要素信息：

```ts
map.on('singleclick', (event) => {
  map.forEachFeatureAtPixel(event.pixel, (feature) => {
    console.log(feature.getProperties());
  });
});
```

## 性能建议

- 大量点位使用聚合（Cluster）渲染
- 启用瓦片缓存减少网络请求
- 视野外图层按需卸载
