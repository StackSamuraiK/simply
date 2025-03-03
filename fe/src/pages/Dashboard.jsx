import { User, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/signin");
    };

    return (
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="bg-white shadow rounded-lg p-8 flex flex-col items-center justify-center min-h-[400px]">
                <div className="bg-indigo-100 p-4 rounded-full mb-6">
                    <User size={48} className="text-indigo-600" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Congratulations!</h1>
                <p className="text-xl text-gray-600 mb-6">You are logged in</p>
                <div className="flex space-x-4">
                    <button className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors">
                        View Profile
                    </button>
                    <button 
                        onClick={handleLogout} 
                        className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors flex items-center"
                    >
                        <LogOut size={16} className="mr-2" 
                        onClick={()=>{
                            localStorage.removeItem("token")
                        }}/>
                        Logout
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Local Storage</h2>
                    <p className="text-gray-500">See your LocalStorage to get your JWT token</p>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Notifications</h2>
                    <p className="text-gray-500">You have no new notifications</p>
                </div>
                <div className="bg-white shadow rounded-lg p-6">
                    <h2 className="text-lg font-medium text-gray-900 mb-2">Quick Actions</h2>
                    <p className="text-gray-500">No quick actions available</p>
                </div>
            </div>
        </main>
    );
};
