import { Outlet } from 'react-router-dom';
import Sidebar from '../layout/Sidebar';
import Topbar from '../layout/Topbar';
import T from '../../tokens/theme';

const AdminLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: T.bg }}>
      <Sidebar collapsed={false} setCollapsed={() => {}} />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Topbar />
        <main style={{ flex: 1, overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;