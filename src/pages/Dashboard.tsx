
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { User, Settings, Moon, Sun, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

const Dashboard = () => {
  const { logout, user } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    { name: 'Profile', href: '/dashboard/profile', icon: User },
    { name: 'Agent', href: '/dashboard/agent', icon: Settings },
  ];

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="flex relative z-10">
        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}>
          <div className="flex h-full flex-col bg-gradient-to-b from-card/95 to-card/90 backdrop-blur-xl border-r border-border/50 shadow-2xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
                  <div className="w-6 h-6 bg-primary rounded-md flex items-center justify-center">
                    <div className="w-3 h-3 bg-background rounded-sm"></div>
                  </div>
                </div>
                <div>
                  <h1 className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                    AuthDash
                  </h1>
                  <p className="text-sm text-muted-foreground">Dashboard</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:scale-110 transition-all duration-300"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* User info */}
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-xl border border-primary/20">
                <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{user?.username}</p>
                  <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-6 space-y-2">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group
                      ${isActive 
                        ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/25 scale-[1.02]' 
                        : 'hover:bg-accent hover:scale-105 text-muted-foreground hover:text-foreground'
                      }
                    `}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className={`h-5 w-5 transition-all duration-300 ${
                      isActive ? 'scale-110' : 'group-hover:scale-110'
                    }`} />
                    <span className="font-medium">{item.name}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-primary-foreground rounded-full animate-pulse" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Footer */}
            <div className="p-6 border-t border-border/50 space-y-3">
              <Button
                variant="ghost"
                onClick={toggleTheme}
                className="w-full justify-start gap-3 hover:scale-105 transition-all duration-300"
              >
                {isDark ? 
                  <Sun className="h-5 w-5" /> : 
                  <Moon className="h-5 w-5" />
                }
                {isDark ? 'Light Mode' : 'Dark Mode'}
              </Button>
              <Button
                variant="outline"
                onClick={handleLogout}
                className="w-full justify-start gap-3 hover:scale-105 transition-all duration-300 border-destructive/20 text-destructive hover:bg-destructive hover:text-destructive-foreground"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 lg:pl-0">
          {/* Mobile header */}
          <div className="lg:hidden bg-card/95 backdrop-blur-xl border-b border-border/50 p-4 sticky top-0 z-30">
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarOpen(true)}
                className="hover:scale-110 transition-all duration-300"
              >
                <Menu className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-primary rounded flex items-center justify-center">
                  <div className="w-2 h-2 bg-background rounded-sm"></div>
                </div>
                <span className="font-bold text-lg">AuthDash</span>
              </div>
              <div className="w-10" /> {/* Spacer */}
            </div>
          </div>

          {/* Page content */}
          <main className="p-6 lg:p-8">
            <div className="max-w-6xl mx-auto">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
