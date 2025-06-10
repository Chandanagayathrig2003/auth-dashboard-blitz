
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Settings, Bot, Cpu, Globe, Sparkles, Check } from 'lucide-react';

interface STTConfig {
  providers: {
    [key: string]: {
      name: string;
      models: {
        [key: string]: {
          name: string;
          languages: {
            [key: string]: string;
          };
        };
      };
    };
  };
}

const AgentPage = () => {
  const [config, setConfig] = useState<STTConfig | null>(null);
  const [selectedProvider, setSelectedProvider] = useState('');
  const [selectedModel, setSelectedModel] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');

  useEffect(() => {
    // Load config from public/stt.json
    fetch('/stt.json')
      .then(response => response.json())
      .then(data => {
        setConfig(data);
        
        // Load saved selections from localStorage
        const saved = localStorage.getItem('agentConfig');
        if (saved) {
          const { provider, model, language } = JSON.parse(saved);
          setSelectedProvider(provider || '');
          setSelectedModel(model || '');
          setSelectedLanguage(language || '');
        }
      })
      .catch(error => console.error('Error loading STT config:', error));
  }, []);

  useEffect(() => {
    // Save selections to localStorage
    if (selectedProvider || selectedModel || selectedLanguage) {
      localStorage.setItem('agentConfig', JSON.stringify({
        provider: selectedProvider,
        model: selectedModel,
        language: selectedLanguage
      }));
    }
  }, [selectedProvider, selectedModel, selectedLanguage]);

  const handleProviderChange = (provider: string) => {
    setSelectedProvider(provider);
    setSelectedModel('');
    setSelectedLanguage('');
  };

  const handleModelChange = (model: string) => {
    setSelectedModel(model);
    setSelectedLanguage('');
  };

  const getAvailableModels = () => {
    if (!config || !selectedProvider) return [];
    return Object.keys(config.providers[selectedProvider]?.models || {});
  };

  const getAvailableLanguages = () => {
    if (!config || !selectedProvider || !selectedModel) return [];
    return Object.keys(config.providers[selectedProvider]?.models[selectedModel]?.languages || {});
  };

  const getDisplayName = (type: 'provider' | 'model' | 'language', key: string) => {
    if (!config) return key;
    
    switch (type) {
      case 'provider':
        return config.providers[key]?.name || key;
      case 'model':
        return config.providers[selectedProvider]?.models[key]?.name || key;
      case 'language':
        return config.providers[selectedProvider]?.models[selectedModel]?.languages[key] || key;
      default:
        return key;
    }
  };

  if (!config) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading configuration...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/20 rounded-2xl mb-6 animate-bounce-in">
          <Bot className="h-10 w-10 text-primary" />
        </div>
        <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
          Agent Configuration
        </h1>
        <p className="text-muted-foreground text-lg">
          Configure your speech-to-text agent settings
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Configuration Panel */}
        <Card className="hover:scale-105 transition-all duration-500 border-2 hover:border-primary/30 hover:shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Settings className="h-6 w-6 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">STT Configuration</CardTitle>
                <CardDescription>Select your preferred speech-to-text settings</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Provider Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-primary" />
                <Label htmlFor="provider" className="text-sm font-medium">Provider</Label>
              </div>
              <Select value={selectedProvider} onValueChange={handleProviderChange}>
                <SelectTrigger className="h-12 border-2 focus:border-primary transition-all duration-300 rounded-xl">
                  <SelectValue placeholder="Select a provider" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-card border-2 shadow-2xl rounded-xl">
                  {Object.keys(config.providers).map((provider) => (
                    <SelectItem 
                      key={provider} 
                      value={provider}
                      className="hover:bg-primary/10 focus:bg-primary/10 rounded-lg cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        {getDisplayName('provider', provider)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Model Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" />
                <Label htmlFor="model" className="text-sm font-medium">Model</Label>
              </div>
              <Select 
                value={selectedModel} 
                onValueChange={handleModelChange}
                disabled={!selectedProvider}
              >
                <SelectTrigger className="h-12 border-2 focus:border-primary transition-all duration-300 rounded-xl disabled:opacity-50">
                  <SelectValue placeholder="Select a model" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-card border-2 shadow-2xl rounded-xl">
                  {getAvailableModels().map((model) => (
                    <SelectItem 
                      key={model} 
                      value={model}
                      className="hover:bg-primary/10 focus:bg-primary/10 rounded-lg cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        {getDisplayName('model', model)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Language Selection */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-primary" />
                <Label htmlFor="language" className="text-sm font-medium">Language</Label>
              </div>
              <Select 
                value={selectedLanguage} 
                onValueChange={setSelectedLanguage}
                disabled={!selectedModel}
              >
                <SelectTrigger className="h-12 border-2 focus:border-primary transition-all duration-300 rounded-xl disabled:opacity-50">
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent className="z-50 bg-card border-2 shadow-2xl rounded-xl">
                  {getAvailableLanguages().map((language) => (
                    <SelectItem 
                      key={language} 
                      value={language}
                      className="hover:bg-primary/10 focus:bg-primary/10 rounded-lg cursor-pointer"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                        {getDisplayName('language', language)}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card className="hover:scale-105 transition-all duration-500 border-2 hover:border-primary/30 hover:shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur-sm">
          <CardHeader className="pb-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-primary animate-pulse" />
              </div>
              <div>
                <CardTitle className="text-2xl">Configuration Summary</CardTitle>
                <CardDescription>Current selected configuration</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {selectedProvider && selectedModel && selectedLanguage ? (
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Cpu className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Provider</p>
                          <p className="font-semibold">{getDisplayName('provider', selectedProvider)}</p>
                          <p className="text-xs text-muted-foreground">({selectedProvider})</p>
                        </div>
                      </div>
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Bot className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Model</p>
                          <p className="font-semibold">{getDisplayName('model', selectedModel)}</p>
                          <p className="text-xs text-muted-foreground">({selectedModel})</p>
                        </div>
                      </div>
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  </div>

                  <div className="p-4 bg-primary/5 rounded-xl border border-primary/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-primary" />
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Language</p>
                          <p className="font-semibold">{getDisplayName('language', selectedLanguage)}</p>
                          <p className="text-xs text-muted-foreground">({selectedLanguage})</p>
                        </div>
                      </div>
                      <Check className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl">
                  <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                    <Check className="h-5 w-5" />
                    <p className="font-medium">Configuration Complete</p>
                  </div>
                  <p className="text-sm text-green-600 dark:text-green-300 mt-1">
                    Your agent is ready with the selected settings
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Settings className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground text-lg mb-2">
                  No configuration selected
                </p>
                <p className="text-sm text-muted-foreground">
                  Select a provider, model, and language to see the summary
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AgentPage;
