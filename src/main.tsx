import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

function App() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Internshala Components</h1>
      <p>Run <code>npm run storybook</code> to see the components.</p>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)