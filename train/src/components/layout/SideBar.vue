<template>
  <div :class="['sidebar', { hide: !isShowSide }]">
    <div class="sidebar__header">
      <div class="more" @click="isShowSide = !isShowSide">
        <div></div>
      </div>
      <div class="logo-box">
        <div class="logo"></div>
      </div>
    </div>
    <div class="sidebar__list__wrap">
      <div class="sidebar__list"></div>
      <router-link
        :to="router.link"
        class="sidebar__list__item"
        v-for="(router, index) in list_router"
        :key="index"
      >
        <div class="icon-box">
          <div
            class="icon"
            :style="{
              width: router['width'],
              height: router['height'],
              backgroundPositionX: router['x'],
              backgroundPositionY: router['y'],
            }"
          ></div>
        </div>

        <span>{{ router["name"] }}</span>
      </router-link>
    </div>
  </div>
</template>

<script>
//'../../assets/Resource/img/Sprites.64af8f61.svg'
export default {
  name: "c-sidebar",
  data() {
    return {
      //true: show sidebar
      isShowSide: true,
      //list các router
      list_router: [
        {
          link: "/overview",
          name: "Tổng quan",
          width: "18px",
          height: "20px",
          x: "-33px",
          y: "-1587px",
        },
        {
          link: "/cash",
          name: "Tiền mặt",
          width: "14px",
          height: "18px",
          x: "-78px",
          y: "-1588px",
        },
        {
          link: "/overvie",
          name: "Tiền gửi",
          width: "16px",
          height: "16px",
          x: "-121px",
          y: "-1590px",
        },
        {
          link: "/overvie",
          name: "Mua hàng",
          width: "16px",
          height: "18px",
          x: "-165px",
          y: "-1589px",
        },
        {
          link: "/overvie",
          name: "Bán hàng",
          width: "20px",
          height: "18px",
          x: "-206px",
          y: "-1588px",
        },
        {
          link: "/overvie",
          name: "Quản lý hoá đơn",
          width: "14px",
          height: "17px",
          x: "-254px",
          y: "-1589px",
        },
        {
          link: "/overvie",
          name: "Khu",
          width: "18px",
          height: "17px",
          x: "-294px",
          y: "-1589px",
        },
        {
          link: "/overvie",
          name: "Công cụ dụng cụ",
          width: "18px",
          height: "17px",
          x: "-339px",
          y: "-1590px",
        },
        {
          link: "/overvie",
          name: "Tài sản cố định",
          width: "17px",
          height: "18px",
          x: "-382px",
          y: "-1589px",
        },
        {
          link: "/overvie",
          name: "Thuế",
          width: "16px",
          height: "16px",
          x: "-427px",
          y: "-1591px",
        },
        {
          link: "/overvie",
          name: "Giá thành",
          width: "17px",
          height: "17px",
          x: "-471px",
          y: "-1590px",
        },
        {
          link: "/overvie",
          name: "Tổng hợp",
          width: "15px",
          height: "16px",
          x: "-514px",
          y: "-1590px",
        },
        {
          link: "/overvie",
          name: "Ngân sách",
          width: "16px",
          height: "16px",
          x: "-427px",
          y: "-1664px",
        },
        {
          link: "/overvie",
          name: "Báo cáo",
          width: "14px",
          height: "13px",
          x: "-552px",
          y: "-1593px",
        },
        {
          link: "/overvie",
          name: "Phân tích tài chính",
          width: "17px",
          height: "14px",
          x: "-251px",
          y: "-1667px",
        },
      ],
    };
  },
};
</script>

<style lang="scss">
@import "../../style/layout/sidebar.scss";
</style>
