// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabslist: {
      type: Array,
      value: [],
    },
  },

  /**
   * 组件的初始数据
   */
  data: { currentIndex: 0 },

  /**
   * 组件的方法列表
   */
  methods: {
    handclick(e) {
      // console.log(tabslist);

      const currentIndex = e.target.dataset.index;
      this.triggerEvent("getindex", currentIndex);
      this.setData({
        currentIndex,
      });
    },
  },
});
