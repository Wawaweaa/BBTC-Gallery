import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './style.css';  // 确保这个路径正确

import App from './App';  // 导入 App 而不是 TestApp

// 添加视口元标签
if (!document.querySelector('meta[name="viewport"]')) {
  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, initial-scale=1.0';
  document.head.appendChild(meta);
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <div className="w-full min-h-screen">
      <App />  {/* 使用 App 组件 */}
    </div>
  </StrictMode>
);