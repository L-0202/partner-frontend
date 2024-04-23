//定义路由
import Index from "../pages/index.vue";
import SearchPage from "../pages/SearchPage.vue";
import UserPage from "../pages/UserPage.vue";
import TeamPage from "../pages/TeamPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";

const routes = [
    { path: '/', component: Index },
    { path: '/team',title:'找队伍', component: TeamPage },
    { path: '/team/add',title:'创建队伍', component: TeamAddPage },
    { path: '/team/update',title:'更新队伍', component: TeamUpdatePage },
    { path: '/user', title:'个人信息',component: UserPage },
    { path: '/search',title:'找伙伴', component: SearchPage },
    { path: '/user/edit',title:'编辑信息', component: UserEditPage },
    { path: '/user/list',title:'用户列表', component: SearchResultPage },
    { path: '/user/login',title:'登录', component: UserLoginPage },
    { path: '/user/update',title:'更新信息', component: UserUpdatePage },
    { path: '/team/create',title:'已创建的队伍', component: UserTeamCreatePage },
    { path: '/team/join',title:'已加入的队伍', component: UserTeamJoinPage },
]

export default routes;