import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  Video,
  Upload,
  Wand2,
  Music,
  Youtube,
  Cloud,
  Sparkles,
  ChevronRight,
  PlayCircle,
  Settings,
  Image,
  Mic,
  FileVideo,
  Loader2,
  Check
} from 'lucide-react';

interface GenerationStep {
  id: string;
  title: string;
  status: 'pending' | 'processing' | 'completed';
  icon: React.ReactNode;
}

function App() {
  const [scriptText, setScriptText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeTab, setActiveTab] = useState<'script' | 'voice' | 'style'>('script');
  const [voiceStyle, setVoiceStyle] = useState('natural');
  const [visualStyle, setVisualStyle] = useState('modern');

  const [generationSteps, setGenerationSteps] = useState<GenerationStep[]>([
    { id: 'script', title: 'Generating Script', status: 'pending', icon: <Wand2 className="h-5 w-5" /> },
    { id: 'voice', title: 'Creating Voiceover', status: 'pending', icon: <Mic className="h-5 w-5" /> },
    { id: 'visuals', title: 'Generating Visuals', status: 'pending', icon: <Image className="h-5 w-5" /> },
    { id: 'video', title: 'Composing Video', status: 'pending', icon: <FileVideo className="h-5 w-5" /> }
  ]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      'audio/*': ['.mp3', '.wav'],
      'video/*': ['.mp4', '.mov'],
    },
    onDrop: (acceptedFiles) => {
      console.log('Files dropped:', acceptedFiles);
    }
  });

  const handleGenerate = () => {
    setIsGenerating(true);
    // Simulate generation process
    setGenerationSteps(steps => 
      steps.map((step, index) => ({
        ...step,
        status: 'processing'
      }))
    );

    // Simulate steps completion
    const stepTimes = [2000, 4000, 6000, 8000];
    stepTimes.forEach((time, index) => {
      setTimeout(() => {
        setGenerationSteps(steps =>
          steps.map((step, i) => ({
            ...step,
            status: i === index ? 'completed' : step.status
          }))
        );
        if (index === stepTimes.length - 1) {
          setIsGenerating(false);
        }
      }, time);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Video className="h-8 w-8 text-indigo-600" />
              <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                VideoGen AI
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <Settings className="h-6 w-6" />
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Transform Text into Engaging Videos
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Harness the power of AI to create professional videos from your text in minutes
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  {['script', 'voice', 'style'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab as any)}
                      className={`flex-1 px-4 py-4 text-center border-b-2 text-sm font-medium ${
                        activeTab === tab
                          ? 'border-indigo-500 text-indigo-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }`}
                    >
                      {tab.charAt(0).toUpperCase() + tab.slice(1)}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="p-6">
                {activeTab === 'script' && (
                  <div className="space-y-4">
                    <textarea
                      className="w-full h-48 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter your topic or script idea..."
                      value={scriptText}
                      onChange={(e) => setScriptText(e.target.value)}
                    />
                    <div {...getRootProps()} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-indigo-500 transition-colors cursor-pointer">
                      <input {...getInputProps()} />
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-gray-600">
                        {isDragActive
                          ? "Drop your files here"
                          : "Drag & drop files or click to upload"}
                      </p>
                    </div>
                  </div>
                )}

                {activeTab === 'voice' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {['natural', 'professional', 'friendly', 'dramatic'].map((style) => (
                        <button
                          key={style}
                          onClick={() => setVoiceStyle(style)}
                          className={`p-4 rounded-lg border ${
                            voiceStyle === style
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <h3 className="font-medium">{style.charAt(0).toUpperCase() + style.slice(1)}</h3>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'style' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      {['modern', 'minimal', 'bold', 'creative'].map((style) => (
                        <button
                          key={style}
                          onClick={() => setVisualStyle(style)}
                          className={`p-4 rounded-lg border ${
                            visualStyle === style
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <h3 className="font-medium">{style.charAt(0).toUpperCase() + style.slice(1)}</h3>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="w-full bg-indigo-600 text-white py-4 rounded-lg hover:bg-indigo-700 transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="flex items-center">
                  <Loader2 className="animate-spin h-5 w-5 mr-2" />
                  Generating...
                </div>
              ) : (
                <>
                  Generate Video <ChevronRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>

            {/* Generation Steps */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h3 className="text-lg font-semibold mb-4">Generation Progress</h3>
              <div className="space-y-4">
                {generationSteps.map((step) => (
                  <div key={step.id} className="flex items-center">
                    <div className={`flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center ${
                      step.status === 'completed' ? 'bg-green-100' :
                      step.status === 'processing' ? 'bg-indigo-100' : 'bg-gray-100'
                    }`}>
                      {step.status === 'completed' ? (
                        <Check className="h-5 w-5 text-green-600" />
                      ) : step.status === 'processing' ? (
                        <Loader2 className="h-5 w-5 text-indigo-600 animate-spin" />
                      ) : (
                        step.icon
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <p className={`text-sm font-medium ${
                        step.status === 'completed' ? 'text-green-600' :
                        step.status === 'processing' ? 'text-indigo-600' : 'text-gray-500'
                      }`}>
                        {step.title}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-2xl font-semibold mb-4 flex items-center">
                <PlayCircle className="h-6 w-6 mr-2 text-indigo-600" />
                Preview
              </h2>
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <p className="text-gray-500">Video preview will appear here</p>
              </div>
            </div>

            {/* YouTube Optimization */}
            <div className="bg-white rounded-xl shadow-xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Youtube className="h-6 w-6 mr-2 text-indigo-600" />
                YouTube Optimization
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="AI-generated title will appear here"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    className="w-full h-24 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="AI-generated description will appear here"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tags
                  </label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="AI-generated tags will appear here"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Sparkles className="h-8 w-8 text-indigo-600" />}
              title="AI Script Generation"
              description="Transform your ideas into professional video scripts with our advanced AI"
            />
            <FeatureCard
              icon={<Music className="h-8 w-8 text-indigo-600" />}
              title="Auto Voice & Music"
              description="Add professional voiceovers and background music automatically"
            />
            <FeatureCard
              icon={<Youtube className="h-8 w-8 text-indigo-600" />}
              title="YouTube Ready"
              description="Optimize your videos for YouTube with AI-generated metadata"
            />
            <FeatureCard
              icon={<Upload className="h-8 w-8 text-indigo-600" />}
              title="Easy Upload"
              description="Upload your own assets or use our AI-generated visuals"
            />
            <FeatureCard
              icon={<Cloud className="h-8 w-8 text-indigo-600" />}
              title="Cloud Processing"
              description="Process your videos in the cloud for maximum performance"
            />
            <FeatureCard
              icon={<Video className="h-8 w-8 text-indigo-600" />}
              title="Smart Editing"
              description="Automatic transitions, captions, and visual effects"
            />
          </div>
        </div>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition">
      <div className="bg-indigo-50 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

export default App;