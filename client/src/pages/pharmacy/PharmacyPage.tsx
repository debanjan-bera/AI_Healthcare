import { Search, ShoppingCart, Pill, Shield, ArrowRight, Plus, X, Sun, Moon } from 'lucide-react';
import ThemeToggle from '../../components/ThemeToggle';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthHook';

const MEDICINES = [
  { name: 'Dolo 650', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop', price: '₹30', unit: '15 Tablets' },
  { name: 'Azithromycin 500', image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=300&h=300&fit=crop', price: '₹75', unit: '3 Tablets' },
  { name: 'Crocin Advance', image: 'https://images.unsplash.com/photo-1550572017-edb730f5b9d3?w=300&h=300&fit=crop', price: '₹25', unit: '15 Tablets' },
  { name: 'Limcee Vitamin C', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop', price: '₹20', unit: '15 Chewable Tablets' },
  { name: 'Benadryl Syrup', image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=300&h=300&fit=crop', price: '₹110', unit: '100ml' },
  { name: 'Digene Gel', image: 'https://images.unsplash.com/photo-1550572017-edb730f5b9d3?w=300&h=300&fit=crop', price: '₹150', unit: '200ml' },
  { name: 'Vicks VapoRub', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop', price: '₹95', unit: '25g' },
  { name: 'Shelcal 500', image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=300&h=300&fit=crop', price: '₹120', unit: '15 Tablets' },
  { name: 'Omee Capsule', image: 'https://images.unsplash.com/photo-1550572017-edb730f5b9d3?w=300&h=300&fit=crop', price: '₹90', unit: '20 Capsules' },
  { name: 'Amlokind 5', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=300&h=300&fit=crop', price: '₹45', unit: '15 Tablets' },
  { name: 'Metformin SR 500', image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?w=300&h=300&fit=crop', price: '₹40', unit: '15 Tablets' },
  { name: 'Zifi 200', image: 'https://images.unsplash.com/photo-1550572017-edb730f5b9d3?w=300&h=300&fit=crop', price: '₹105', unit: '10 Tablets' },
];

const PharmacyPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (med: any) => {
    setCartItems(prev => [...prev, med]);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 font-inter selection:bg-blue-100 transition-colors duration-300">
      {/* Navbar */}
      <nav className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-gray-200/60 dark:border-slate-800 sticky top-0 z-50 transition-all">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Pill size={22} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-slate-400 tracking-tight">HealthCore Pharmacy</span>
          </div>
          
          <div className="hidden lg:flex items-center gap-1 bg-gray-50/80 dark:bg-slate-800/50 p-1 rounded-xl border border-gray-100 dark:border-slate-700">
            {['Dashboard', 'Pharmacy', 'Assistant', 'Doctors', 'Appointment'].map((tab) => (
              <button 
                key={tab}
                onClick={() => {
                  switch (tab) {
                    case 'Dashboard': navigate('/dashboard'); break;
                    case 'Pharmacy': navigate('/pharmacy'); break;
                    case 'Assistant': navigate('/chat'); break;
                    case 'Doctors': navigate('/doctors'); break;
                    case 'Appointment': navigate('/appointment'); break;
                  }
                }}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  tab === 'Pharmacy' 
                    ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm border border-gray-200/50 dark:border-slate-600' 
                    : 'text-gray-500 dark:text-slate-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100/50 dark:hover:bg-slate-800/50'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-5">
            <ThemeToggle />
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-gray-400 dark:text-slate-500 hover:text-gray-900 dark:hover:text-white transition-colors relative"
            >
              <ShoppingCart size={22} />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white text-[10px] font-bold flex items-center justify-center rounded-full border border-white dark:border-slate-900">
                  {cartItems.length}
                </span>
              )}
            </button>
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold flex items-center justify-center cursor-pointer border-2 border-white dark:border-slate-800 shadow-sm ml-2 ring-2 ring-transparent hover:ring-blue-100 dark:hover:ring-blue-900 transition-all">
              {user?.name ? user.name.substring(0, 2).toUpperCase() : 'U'}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-6 mt-8 mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Digital Pharmacy</h1>
        <p className="text-gray-500 dark:text-slate-400 mt-1">Order your prescribed medications online securely.</p>
        
        {/* Search Bar */}
        <div className="mt-8 max-w-2xl relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-4 bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl text-sm placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-blue-600/10 dark:focus:ring-blue-900/20 focus:border-blue-600 transition-all shadow-[0_4px_20px_rgb(0,0,0,0.03)] text-slate-900 dark:text-white"
            placeholder="Search for medicines, health products, and more..."
          />
          <button className="absolute inset-y-2 right-2 px-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition-colors shadow-md shadow-blue-600/20">
            Search
          </button>
        </div>
      </div>

      {/* Prescription Upload Banner */}
      <div className="max-w-[1600px] mx-auto px-6 pb-8">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 text-white relative overflow-hidden group shadow-lg shadow-blue-600/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">Have a Prescription?</h2>
              <p className="text-blue-50 text-sm max-w-md">Upload your doctor's prescription and we will arrange your medicines securely.</p>
            </div>
          </div>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold text-sm hover:shadow-[0_4px_20px_rgba(255,255,255,0.3)] transition-all flex items-center gap-2 group/btn relative z-10 whitespace-nowrap">
            Upload Prescription
            <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Popular Medicines & Pharmacies */}
      <div className="max-w-[1600px] mx-auto px-6 pb-12 gap-8 flex flex-col">
        {/* Popular Medicines */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Popular Medicines</h3>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:text-blue-700">View All</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {MEDICINES.map((med, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-3 hover:shadow-md transition-shadow group cursor-pointer text-center relative flex flex-col items-center">
                <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-gray-50 dark:bg-slate-800 relative">
                  <img src={med.image} alt={med.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white mb-0.5">{med.name}</h4>
                <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">{med.unit}</p>
                <div className="flex items-center justify-between w-full mt-auto pt-2 border-t border-gray-50 dark:border-slate-800">
                  <span className="font-bold text-blue-600 dark:text-blue-400">{med.price}</span>
                  <button 
                    onClick={() => handleAddToCart(med)}
                    className="w-6 h-6 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors"
                  >
                    <Plus size={14} strokeWidth={3} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Nearby Pharmacies */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Nearby Pharmacies</h3>
            <button className="text-blue-600 dark:text-blue-400 text-sm font-semibold hover:text-blue-700">Change Location</button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: 'CityCare Pharmacy', image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=300&h=300&fit=crop' },
              { name: 'HealthPlus Meds', image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=300&h=300&fit=crop' },
              { name: 'QuickHeal Store', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=300&fit=crop' },
              { name: 'MediLife Pharma', image: 'https://images.unsplash.com/photo-1576602976047-174e57a47881?w=300&h=300&fit=crop' },
              { name: 'CureAll Drugs', image: 'https://images.unsplash.com/photo-1631549916768-4119b2e5f926?w=300&h=300&fit=crop' },
              { name: 'Wellness Center', image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=300&h=300&fit=crop' }
            ].map((pharm, i) => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl p-3 hover:shadow-md transition-shadow group cursor-pointer text-center flex flex-col">
                <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 bg-gray-50 dark:bg-slate-800 relative">
                  <img src={pharm.image} alt={pharm.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h4 className="font-bold text-sm text-gray-900 dark:text-white">{pharm.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cart Drawer Overlay */}
      {isCartOpen && (
        <div className="fixed inset-0 bg-black/20 dark:bg-black/40 backdrop-blur-sm z-[100] flex justify-end animate-in fade-in duration-300">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-slate-800 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                <ShoppingCart size={24} className="text-blue-600 dark:text-blue-400" />
                Your Cart
              </h2>
              <button 
                onClick={() => setIsCartOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 dark:bg-slate-800 text-gray-500 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cartItems.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-slate-600 space-y-4">
                  <ShoppingCart size={48} className="opacity-20" />
                  <p>Your cart is empty.</p>
                </div>
              ) : (
                cartItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-4 bg-gray-50 dark:bg-slate-800/50 p-3 rounded-xl border border-gray-100 dark:border-slate-700">
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-white dark:bg-slate-800 shrink-0">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-sm text-gray-900 dark:text-white truncate">{item.name}</h4>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-bold uppercase">{item.unit}</p>
                      <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mt-1">{item.price}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="p-6 border-t border-gray-100 bg-gray-50/50">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-500 font-medium">Total</span>
                  <span className="text-xl font-bold text-gray-900">
                    ₹{cartItems.reduce((total, item) => total + parseFloat(item.price.replace('₹', '')), 0).toFixed(2)}
                  </span>
                </div>
                <button 
                  onClick={() => {
                    alert("Proceeding to checkout...");
                    setCartItems([]);
                    setIsCartOpen(false);
                  }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2"
                >
                  Checkout Now <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PharmacyPage;
