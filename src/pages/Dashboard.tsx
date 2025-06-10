import { Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <nav>
      <div 
        onClick={() => navigate('/')} 
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-gray-500 bg-white/10 hover:bg-white/20 hover:text-gray-900 cursor-pointer transition-all"
      >
        <Home className="w-4 h-4" />
        <span>Home</span>
      </div>
    </nav>
  );
};

export default Dashboard; 