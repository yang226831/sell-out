import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


export default new VueRouter({
  routes: [
    { path: '/', component: () => import('../views/Login.vue') },
    { path: '/login', component: () => import('../views/Login.vue') },
    {
      path: '/home', component: () => import('../views/Home.vue'), children: [
        { path: '', component: () => import('../views/Index.vue') },
        // { path: '/home/index', component: () => import('../views/Index.vue') },
        { path: 'admin_list', component: () => import('../views/home/Admin_list.vue'),meta:['账号管理','账号列表']},
        { path: 'admin_add', component: () => import('../views/home/Admin_add.vue'),meta:['账号管理','添加账号'] },
        { path: 'admin_chgpwd', component: () => import('../views/home/Admin_chgpwd.vue'),meta:['账号管理','修改密码'] },
        { path: 'admin_info', component: () => import('../views/home/Admin_info.vue'),meta:['账号管理','个人信息']},
        { path: 'sale_goods', component: () => import('../views/sale/sale_goods.vue'),meta:['销售统计','商品统计'] },
        { path: 'sale_order', component: () => import('../views/sale/sale_order.vue') ,meta:['销售统计','订单统计'] },
        { path: 'goods_add', component: () => import('../views/goods/goods_add.vue') ,meta:['商品管理','添加商品']},
        { path: 'goods_change/:id', component: () => import('../views/goods/goods_change.vue') ,meta:['商品管理','修改商品']},
        { path: 'goods_list', component: () => import('../views/goods/goods_list.vue') ,meta:['商品管理','商品列表']},
        { path: 'bill_manage', component: () => import('../views/Bill_manage.vue') ,meta:['订单管理'] },
        { path: 'shop', component: () => import('../views/Shop.vue') ,meta:['店铺管理'] },
      ]
    },
    //退出界面
    {path:'/logout',component:()=>import('../views//Logout.vue')}
  ]
})