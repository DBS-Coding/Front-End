// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import useUIStore from "../../store/uiStore";
import { Home, MessageCircle, Settings, Scroll, Crown } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { sidebarOpen } = useUIStore();

  const menuItems = [
    { path: "/home", label: "Beranda", icon: <Home className="w-4 h-4" /> },
    {
      path: "/chatsoekarno",
      label: "Tanya Bung Karno",
      icon: <MessageCircle className="w-4 h-4" />,
    },
    {
      path: "/chathatta",
      label: "Tanya Bung Hatta",
      icon: <MessageCircle className="w-4 h-4" />,
    },
    {
      path: "/crudsoekarno",
      label: "Arsip Soekarno",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      path: "/crudhatta",
      label: "Arsip Hatta",
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const isActive = (path) => location.pathname === path;

  const handleNavigation = (path) => {
    navigate(path);
    if (window.innerWidth < 1024) {
      useUIStore.getState().setSidebarOpen(false);
    }
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden md:ms-4"
          onClick={() => useUIStore.getState().setSidebarOpen(false)}
        />
      )}

      <motion.aside
        className={`mb-4
    fixed lg:sticky inset-y-0 left-0 z-50 
    lg:top-0 lg:w-1/4 w-64 sm:w-72 space-y-4 pt-4 lg:pt-0
    transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
    ${!sidebarOpen ? "lg:w-0 lg:overflow-hidden" : ""}
  `}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="bg-black/30 backdrop-blur-md border-2 border-amber-400/30 w-full h-full rounded-xl p-4 xl:p-6 shadow-xl">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-amber-600 rounded-full flex items-center justify-center border-2 border-amber-300">
              <Scroll className="w-4 h-4 text-amber-900" />
            </div>
            <h2 className="text-lg font-bold text-amber-100">Navigasi</h2>
          </div>

          <nav className="space-y-3">
            {menuItems.map((item) => (
              <motion.button
                key={item.path}
                onClick={() => handleNavigation(item.path)}
                className={`
                  w-full flex items-center justify-start gap-3 lg:gap-2 xl:gap-3 px-4 py-2.5 border-2 rounded-lg 
                  transition-all duration-300 text-sm font-medium
                  ${
                    isActive(item.path)
                      ? "bg-gradient-to-r from-amber-500/20 to-amber-600/20 text-amber-100 border-amber-400"
                      : "bg-black/20 text-amber-200 border-amber-400/20 hover:border-amber-400/40"
                  }
                `}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
              >
                <div
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center shrink-0
                    ${
                      isActive(item.path)
                        ? "bg-gradient-to-br from-amber-400 to-amber-600"
                        : "bg-black/30 border border-amber-400/30"
                    }
                  `}
                >
                  {item.icon}
                </div>
                <span className="flex-1 text-start align-middle lg:text-xs xl:text-sm">{item.label}</span>
              </motion.button>
            ))}
          </nav>

          <div className="absolute bottom-6 left-0 right-0 px-6">
            <div className="flex items-center justify-center gap-2">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-amber-400/50"></div>
              <Crown className="w-4 h-4 text-amber-400/50" />
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-amber-400/50"></div>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
