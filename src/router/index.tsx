import {
    DesktopOutlined,
    FileOutlined,
    PieChartOutlined,
    TeamOutlined,
    UserOutlined,
} from '@ant-design/icons';
import About from "../pages/About";
import Home from "../pages/Home";

export default [{
    path: '/',
    key: 'home',
    name: "home",
    icon: <DesktopOutlined />,
    children: [
        {
            path: '/home/about',
            key: 'home_about',
            name: "home_about",
            element: <Home />,
        }
    ]
}, {
    path: '/about',
    key: 'about',
    name: "about",
    element: <About />,
    icon: <FileOutlined />
}]