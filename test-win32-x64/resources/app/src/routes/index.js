import Simulation429 from '../page/subPages/Simulation429';
import Monitor429 from '../page/subPages/Monitor429';
import PageNotFound from '../page/PageNotFound';

export const mainRoutes = [{
    path:'/simulation',
    component:Simulation429
},{
    path:'/monitor',
    component:Monitor429
},{
    path:'/404',
    component:PageNotFound
}]

