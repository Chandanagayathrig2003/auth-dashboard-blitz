
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Zap, Users, Moon, Sun, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';

const LandingPage = () => {
  const { isDark, toggleTheme } = useTheme();

  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'Enterprise-grade security with encrypted data storage and multi-layer protection'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Optimized performance with instant loading and seamless user experience'
    },
    {
      icon: Users,
      title: 'Smart Management',
      description: 'Intelligent profile and settings management with AI-powered recommendations'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-60 h-60 bg-accent/5 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-10 container mx-auto px-6 py-6">
        <div className="flex justify-between items-center backdrop-blur-sm bg-background/80 rounded-2xl px-6 py-3 border border-border/50 shadow-lg">
          <div className="text-2xl font-bold text-primary flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary animate-pulse" />
            AuthDash
          </div>
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full hover:scale-110 transition-all duration-300"
            >
              {isDark ? 
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300" /> : 
                <Moon className="h-5 w-5 rotate-0 scale-100 transition-all duration-300" />
              }
            </Button>
            <Link to="/login">
              <Button variant="outline" className="rounded-full hover:scale-105 transition-all duration-300 group">
                Login
                <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="relative z-10 container mx-auto px-6 py-16">
        <div className="text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm text-primary mb-8 animate-fade-in border border-primary/20">
            <Sparkles className="h-4 w-4" />
            <span>Next Generation Authentication Platform</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold text-foreground mb-8 animate-fade-in leading-tight">
            Secure Dashboard
            <span className="text-primary block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              Made Simple
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-3xl mx-auto animate-fade-in leading-relaxed">
            Experience the next generation of authentication and user management. 
            Built with cutting-edge technologies for maximum security, performance, and user delight.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center animate-fade-in">
            <Link to="/signup">
              <Button size="lg" className="text-lg px-10 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group bg-gradient-to-r from-primary to-primary/90">
                Get Started Free
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
            <Link to="/login">
              <Button variant="outline" size="lg" className="text-lg px-10 py-4 rounded-full hover:scale-105 transition-all duration-300 group">
                Sign In
                <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-32 grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="text-center hover:scale-105 transition-all duration-500 border-2 hover:border-primary/30 hover:shadow-2xl group bg-gradient-to-br from-background to-secondary/5 backdrop-blur-sm"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardContent className="p-8">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl mb-6 group-hover:scale-110 transition-all duration-500 group-hover:rotate-3">
                  <feature.icon className="h-10 w-10 text-primary group-hover:scale-110 transition-all duration-300" />
                </div>
                <h3 className="text-2xl font-semibold mb-4 group-hover:text-primary transition-colors duration-300">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-32 text-center">
          <Card className="max-w-3xl mx-auto border-2 border-primary/30 bg-gradient-to-br from-primary/5 via-background to-secondary/10 backdrop-blur-sm hover:scale-105 transition-all duration-500 shadow-2xl">
            <CardContent className="p-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-2xl mb-6">
                <Sparkles className="h-8 w-8 text-primary animate-pulse" />
              </div>
              <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                Ready to Transform Your Workflow?
              </h2>
              <p className="text-muted-foreground mb-10 text-lg leading-relaxed">
                Join thousands of users who trust our secure authentication platform for their mission-critical applications.
              </p>
              <Link to="/signup">
                <Button size="lg" className="text-lg px-12 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl group bg-gradient-to-r from-primary to-primary/90">
                  Create Your Account
                  <ArrowRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
