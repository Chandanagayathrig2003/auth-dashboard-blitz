
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Settings, ChevronDown } from 'lucide-react';

interface Language {
  id: string;
  name: string;
}

interface Model {
  id: string;
  name: string;
  languages: Language[];
}

interface Provider {
  id: string;
  name: string;
  models: Model[];
}

interface STTConfig {
  providers: Provider[];
}

interface SelectedConfig {
  provider: string;
  model: string;
  language: string;
}

const AgentPage = () => {
  const [config, setConfig] = useState<STTConfig>({ providers: [] });
  const [selectedConfig, setSelectedConfig] = useState<SelectedConfig>({
    provider: '',
    model: '',
    language: ''
  });
  const [availableModels, setAvailableModels] = useState<Model[]>([]);
  const [availableLanguages, setAvailableLanguages] = useState<Language[]>([]);

  useEffect(() => {
    loadConfig();
    loadSavedConfig();
  }, []);

  const loadConfig = async () => {
    try {
      const response = await fetch('/stt.json');
      const data = await response.json();
      setConfig(data);
    } catch (error) {
      console.error('Failed to load STT config:', error);
      toast({
        title: "Error",
        description: "Failed to load configuration.",
        variant: "destructive",
      });
    }
  };

  const loadSavedConfig = () => {
    const saved = localStorage.getItem('agent_config');
    if (saved) {
      try {
        const parsedConfig = JSON.parse(saved);
        setSelectedConfig(parsedConfig);
      } catch (error) {
        console.error('Failed to parse saved config:', error);
      }
    }
  };

  const saveConfig = (newConfig: SelectedConfig) => {
    localStorage.setItem('agent_config', JSON.stringify(newConfig));
    toast({
      title: "Configuration saved",
      description: "Your agent configuration has been saved.",
    });
  };

  const handleProviderChange = (providerId: string) => {
    const provider = config.providers.find(p => p.id === providerId);
    if (provider) {
      setAvailableModels(provider.models);
      setAvailableLanguages([]);
      
      const newConfig = {
        provider: providerId,
        model: '',
        language: ''
      };
      setSelectedConfig(newConfig);
      saveConfig(newConfig);
    }
  };

  const handleModelChange = (modelId: string) => {
    const model = availableModels.find(m => m.id === modelId);
    if (model) {
      setAvailableLanguages(model.languages);
      
      const newConfig = {
        ...selectedConfig,
        model: modelId,
        language: ''
      };
      setSelectedConfig(newConfig);
      saveConfig(newConfig);
    }
  };

  const handleLanguageChange = (languageId: string) => {
    const newConfig = {
      ...selectedConfig,
      language: languageId
    };
    setSelectedConfig(newConfig);
    saveConfig(newConfig);
  };

  const getSelectedProvider = () => config.providers.find(p => p.id === selectedConfig.provider);
  const getSelectedModel = () => availableModels.find(m => m.id === selectedConfig.model);
  const getSelectedLanguage = () => availableLanguages.find(l => l.id === selectedConfig.language);

  useEffect(() => {
    if (selectedConfig.provider && config.providers.length > 0) {
      const provider = config.providers.find(p => p.id === selectedConfig.provider);
      if (provider) {
        setAvailableModels(provider.models);
        
        if (selectedConfig.model) {
          const model = provider.models.find(m => m.id === selectedConfig.model);
          if (model) {
            setAvailableLanguages(model.languages);
          }
        }
      }
    }
  }, [config, selectedConfig.provider, selectedConfig.model]);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Configuration */}
      <Card className="animate-fade-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Speech-to-Text Configuration
          </CardTitle>
          <CardDescription>
            Configure your STT provider, model, and language preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Provider Selection */}
            <div className="space-y-2">
              <Label>Provider</Label>
              <Select value={selectedConfig.provider} onValueChange={handleProviderChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select provider" />
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </SelectTrigger>
                <SelectContent>
                  {config.providers.map((provider) => (
                    <SelectItem key={provider.id} value={provider.id}>
                      {provider.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Model Selection */}
            <div className="space-y-2">
              <Label>Model</Label>
              <Select 
                value={selectedConfig.model} 
                onValueChange={handleModelChange}
                disabled={!selectedConfig.provider}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select model" />
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </SelectTrigger>
                <SelectContent>
                  {availableModels.map((model) => (
                    <SelectItem key={model.id} value={model.id}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Language Selection */}
            <div className="space-y-2">
              <Label>Language</Label>
              <Select 
                value={selectedConfig.language} 
                onValueChange={handleLanguageChange}
                disabled={!selectedConfig.model}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select language" />
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </SelectTrigger>
                <SelectContent>
                  {availableLanguages.map((language) => (
                    <SelectItem key={language.id} value={language.id}>
                      {language.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Card */}
      {selectedConfig.provider && selectedConfig.model && selectedConfig.language && (
        <Card className="animate-fade-in border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
          <CardHeader>
            <CardTitle className="text-lg">Configuration Summary</CardTitle>
            <CardDescription>
              Current selection details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Provider</p>
                <p className="font-medium">
                  {getSelectedProvider()?.name} ({selectedConfig.provider})
                </p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Model</p>
                <p className="font-medium">
                  {getSelectedModel()?.name} ({selectedConfig.model})
                </p>
              </div>
              
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Language</p>
                <p className="font-medium">
                  {getSelectedLanguage()?.name} ({selectedConfig.language})
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AgentPage;
