import './App.css';
import { useEffect } from 'react';
import './App.css';
import Router from '@/router';
import {Navbar} from '@/components/Navbar';
import { usePerformanceTracking } from '@/hooks/performance/usePerformanceTracking';
import { preloadAssets, createAssetMap, type AssetKey } from '@/utils/assetPreloader';

const initialAssets = [
  'CompanyIcon', 
  'IndustryIcon', 
  'UpArrow', 
  'DownArrow', 
  'MarketCapIcon', 
  'HappyFace', 
  'NeutralFace', 
  'SadFace', 
  'arrowDownIcon', 
  'arrowUpIcon'
] as AssetKey[];

function App() {
  usePerformanceTracking('App');

  useEffect(() => {
    const loadInitialAssets = async () => {
      try {
        const assetMap = createAssetMap(initialAssets);
        await preloadAssets(assetMap);
      } catch (error) {
        console.error('Failed to load app initial assets:', error);
      }
    };

    loadInitialAssets();
  }, []);

  return (
    <div className="App">
      <h2>STONKS</h2>
      <Navbar />
      <Router />
    </div>
  );
}

export default App;
