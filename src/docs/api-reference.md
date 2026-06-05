# API 参考

本页列出平台核心模块的公开接口。所有接口均为具名导出。

## 地图模块

### createMapInstance

创建并返回一个地图实例。

```ts
function createMapInstance(options: MapOptions): MapInstance;
```

参数：

- `options.target` —— 挂载容器的 DOM id
- `options.center` —— 初始中心坐标
- `options.zoom` —— 初始缩放级别

### addMarker

向地图添加一个点位标记。

```ts
function addMarker(map: MapInstance, marker: MarkerConfig): void;
```

## 场景模块

### createScene

初始化三维场景并返回控制句柄。

```ts
function createScene(container: HTMLElement): SceneHandle;
```

### loadModel

异步加载模型资源。

```ts
function loadModel(scene: SceneHandle, url: string): Promise<ModelHandle>;
```

## 数据模块

### subscribeData

订阅实时数据流，返回取消订阅函数。

```ts
function subscribeData(channel: string, handler: DataHandler): () => void;
```
