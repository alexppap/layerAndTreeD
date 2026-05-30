import { mount } from '@vue/test-utils';
import HelloWorld from '../HelloWorld.vue';

describe('HelloWorld', () => {
  it('将 msg 渲染到 h1 标题', () => {
    const wrapper = mount(HelloWorld, { props: { msg: '你好，Vitest' } });
    expect(wrapper.get('h1').text()).toBe('你好，Vitest');
  });

  it('点击按钮后计数递增', async () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'count' } });
    const button = wrapper.get('button');

    expect(button.text()).toBe('count is 0');
    await button.trigger('click');
    expect(button.text()).toBe('count is 1');
  });
});
