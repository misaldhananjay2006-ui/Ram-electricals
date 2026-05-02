import { useState } from 'react';

// WhatsApp number - replace with actual number
const WHATSAPP_NUMBER = "+918600492533"; // Format: country code + number without + or spaces

// Product Categories
const categories = [
  { id: 'all', name: 'All Products', icon: '🔌' },
  { id: 'plc', name: 'PLC & Automation', icon: '🖥️' },
  { id: 'motors', name: 'Motors & Drives', icon: '⚙️' },
  { id: 'switches', name: 'Switches & Breakers', icon: '🔘' },
  { id: 'cables', name: 'Cables & Wires', icon: '〰️' },
  { id: 'lighting', name: 'Lighting', icon: '💡' },
  { id: 'instruments', name: 'Instruments', icon: '📊' },
  { id: 'safety', name: 'Safety Equipment', icon: '🛡️' },
];

// Products Data
const products = [
  // PLC & Automation
  { id: 1, name: 'Siemens S7-1200 PLC', category: 'plc', description: 'Compact CPU with integrated I/O, perfect for small to medium applications', brand: 'Siemens', image: '🖥️' },
  { id: 2, name: 'Siemens S7-1500 PLC', category: 'plc', description: 'Advanced PLC for complex automation tasks with high performance', brand: 'Siemens', image: '🖥️' },
  { id: 3, name: 'Siemens LOGO! 8', category: 'plc', description: 'Compact logic module for simple automation tasks', brand: 'Siemens', image: '📱' },
  { id: 4, name: 'Siemens HMI KTP700', category: 'plc', description: '7-inch touch panel for process visualization', brand: 'Siemens', image: '📺' },
  { id: 5, name: 'Allen Bradley MicroLogix', category: 'plc', description: 'Compact programmable controller for industrial applications', brand: 'Allen Bradley', image: '🔲' },
  { id: 6, name: 'Delta PLC DVP Series', category: 'plc', description: 'High-performance PLC with excellent connectivity options', brand: 'Delta', image: '🖥️' },
  { id: 7, name: 'Mitsubishi FX5U PLC', category: 'plc', description: 'High-speed, high-capacity compact PLC', brand: 'Mitsubishi', image: '🖥️' },
  { id: 8, name: 'Schneider M221 PLC', category: 'plc', description: 'Compact controller with embedded Ethernet', brand: 'Schneider', image: '🖥️' },
  
  // Motors & Drives
  { id: 9, name: 'Siemens 3-Phase Motor', category: 'motors', description: 'High efficiency IE3 induction motor, various power ratings', brand: 'Siemens', image: '⚙️' },
  { id: 10, name: 'ABB Motor', category: 'motors', description: 'Premium efficiency motor for industrial applications', brand: 'ABB', image: '⚙️' },
  { id: 11, name: 'Siemens VFD G120', category: 'motors', description: 'Variable frequency drive for precise motor control', brand: 'Siemens', image: '🎛️' },
  { id: 12, name: 'Danfoss VFD', category: 'motors', description: 'Frequency converter for HVAC and industrial applications', brand: 'Danfoss', image: '🎛️' },
  { id: 13, name: 'Servo Motor', category: 'motors', description: 'High precision servo motor for automation', brand: 'Various', image: '⚙️' },
  { id: 14, name: 'Gear Motor', category: 'motors', description: 'Helical gear motor with high torque output', brand: 'Various', image: '⚙️' },
  
  // Switches & Breakers
  { id: 15, name: 'Siemens MCCB 3VA', category: 'switches', description: 'Molded case circuit breaker, 25A to 630A', brand: 'Siemens', image: '🔘' },
  { id: 16, name: 'Siemens MCB 5SL', category: 'switches', description: 'Miniature circuit breaker for distribution boards', brand: 'Siemens', image: '🔘' },
  { id: 17, name: 'Schneider MCB', category: 'switches', description: 'Acti9 iC60N miniature circuit breaker', brand: 'Schneider', image: '🔘' },
  { id: 18, name: 'ABB MCCB', category: 'switches', description: 'System Pro E power molded case circuit breaker', brand: 'ABB', image: '🔘' },
  { id: 19, name: 'Contactors 3RT', category: 'switches', description: 'Siemens contactors for motor switching', brand: 'Siemens', image: '🔌' },
  { id: 20, name: 'Overload Relay', category: 'switches', description: 'Thermal overload relay for motor protection', brand: 'Various', image: '🛡️' },
  { id: 21, name: 'Limit Switch', category: 'switches', description: 'Industrial limit switch for position sensing', brand: 'Various', image: '🔘' },
  { id: 22, name: 'Push Button Station', category: 'switches', description: 'Emergency stop and control push buttons', brand: 'Various', image: '🔴' },
  
  // Cables & Wires
  { id: 23, name: 'Armoured Cable', category: 'cables', description: 'Steel wire armoured cable for underground installations', brand: 'Polycab', image: '〰️' },
  { id: 24, name: 'Flexible Cable', category: 'cables', description: 'Multi-core flexible cable for machinery', brand: 'Polycab', image: '〰️' },
  { id: 25, name: 'Control Cable', category: 'cables', description: 'Shielded control cable for signal transmission', brand: 'Havells', image: '〰️' },
  { id: 26, name: 'Instrumentation Cable', category: 'cables', description: 'Twisted pair cable for instrumentation', brand: 'Polycab', image: '〰️' },
  { id: 27, name: 'Power Cable', category: 'cables', description: 'High voltage power cable for industrial use', brand: 'Havells', image: '〰️' },
  { id: 28, name: 'Cable Glands', category: 'cables', description: 'Brass cable glands for cable termination', brand: 'Various', image: '🔩' },
  
  // Lighting
  { id: 29, name: 'LED Panel Light', category: 'lighting', description: 'Surface mounted LED panel for industrial lighting', brand: 'Philips', image: '💡' },
  { id: 30, name: 'Industrial LED High Bay', category: 'lighting', description: 'High bay LED for warehouse and factory lighting', brand: 'Philips', image: '💡' },
  { id: 31, name: 'LED Tube Light', category: 'lighting', description: 'T5/T8 LED tube for commercial lighting', brand: 'Havells', image: '💡' },
  { id: 32, name: 'Street Light LED', category: 'lighting', description: 'Outdoor LED street light with IP65 rating', brand: 'Philips', image: '💡' },
  { id: 33, name: 'Emergency Light', category: 'lighting', description: 'LED emergency light with battery backup', brand: 'Various', image: '💡' },
  { id: 34, name: 'Flood Light LED', category: 'lighting', description: 'High power LED flood light for outdoor areas', brand: 'Philips', image: '💡' },
  
  // Instruments
  { id: 35, name: 'Digital Panel Meter', category: 'instruments', description: 'Multi-function meter for voltage, current, power measurement', brand: 'Siemens', image: '📊' },
  { id: 36, name: 'Temperature Controller', category: 'instruments', description: 'PID temperature controller with display', brand: 'Omron', image: '🌡️' },
  { id: 37, name: 'Pressure Transmitter', category: 'instruments', description: 'Industrial pressure sensor 4-20mA output', brand: 'Siemens', image: '📈' },
  { id: 38, name: 'Level Sensor', category: 'instruments', description: 'Ultrasonic level sensor for tanks', brand: 'Various', image: '📊' },
  { id: 39, name: 'Energy Meter', category: 'instruments', description: 'Three-phase energy meter with data logging', brand: 'Schneider', image: '⚡' },
  { id: 40, name: 'Thermocouple', category: 'instruments', description: 'K-type thermocouple for temperature measurement', brand: 'Various', image: '🌡️' },
  { id: 41, name: 'Flow Meter', category: 'instruments', description: 'Electromagnetic flow meter for liquids', brand: 'Various', image: '📊' },
  { id: 42, name: 'Current Transformer', category: 'instruments', description: 'CT for current measurement and protection', brand: 'Various', image: '🔌' },
  
  // Safety Equipment
  { id: 43, name: 'Safety Relay', category: 'safety', description: 'Emergency stop relay for machine safety', brand: 'Siemens', image: '🛡️' },
  { id: 44, name: 'Light Curtain', category: 'safety', description: 'Optical safety sensor for hazardous areas', brand: 'Omron', image: '🛡️' },
  { id: 45, name: 'Safety Switch', category: 'safety', description: 'Interlock safety switch for guard doors', brand: 'Various', image: '🔒' },
  { id: 46, name: 'Surge Protector', category: 'safety', description: 'SPD for protection against voltage spikes', brand: 'Schneider', image: '⚡' },
  { id: 47, name: 'Isolation Switch', category: 'safety', description: 'Load break switch for isolation', brand: 'Siemens', image: '🔘' },
  { id: 48, name: 'Earthing Kit', category: 'safety', description: 'Complete earthing system kit', brand: 'Various', image: '🌍' },
];

// WhatsApp inquiry function
const openWhatsApp = (productName: string, brand: string) => {
  const message = encodeURIComponent(`Hello, I am interested in "${productName}" (Brand: ${brand}). Please provide more details about availability and specifications. Thank you!`);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
  window.open(url, '_blank');
};

// Header Component
function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-3">
            <div className="bg-yellow-400 p-2 rounded-lg">
              <span className="text-2xl">⚡</span>
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight">Ram Electricals</h1>
              <p className="text-xs md:text-sm text-blue-200">Spare Parts</p>
            </div>
          </div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#home" className="hover:text-yellow-400 transition-colors font-medium">Home</a>
            <a href="#products" className="hover:text-yellow-400 transition-colors font-medium">Products</a>
            <a href="#about" className="hover:text-yellow-400 transition-colors font-medium">About</a>
            <a href="#contact" className="hover:text-yellow-400 transition-colors font-medium">Contact</a>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full flex items-center space-x-2 transition-colors font-medium"
            >
              <span>📱</span>
              <span>WhatsApp</span>
            </a>
          </nav>
          
          {/* Mobile menu button */}
          <button 
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="text-2xl">{mobileMenuOpen ? '✕' : '☰'}</span>
          </button>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <nav className="md:hidden pb-4 space-y-2">
            <a href="#home" className="block py-2 hover:text-yellow-400 transition-colors">Home</a>
            <a href="#products" className="block py-2 hover:text-yellow-400 transition-colors">Products</a>
            <a href="#about" className="block py-2 hover:text-yellow-400 transition-colors">About</a>
            <a href="#contact" className="block py-2 hover:text-yellow-400 transition-colors">Contact</a>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full mt-2"
            >
              📱 WhatsApp Us
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}

// Hero Section
function Hero() {
  return (
    <section id="home" className="bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-block bg-yellow-400 text-blue-900 px-4 py-1 rounded-full text-sm font-semibold">
              ⚡ Your Trusted Partner
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Quality Electrical
              <span className="text-yellow-400"> Spare Parts</span>
            </h2>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed">
              Your one-stop destination for premium electrical components. We stock genuine Siemens PLCs, motors, switchgear, cables, and all industrial electrical items.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#products"
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg"
              >
                Browse Products
              </a>
              <a 
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-3 rounded-full transition-all transform hover:scale-105 shadow-lg flex items-center space-x-2"
              >
                <span>📱</span>
                <span>Get Quote</span>
              </a>
            </div>
            <div className="flex items-center space-x-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-400">500+</p>
                <p className="text-sm text-blue-200">Products</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-yellow-400">02+</p>
                <p className="text-sm text-blue-200">Years Experience</p>
              </div>
              <div className="text-center">
               
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <div className="bg-blue-700/30 rounded-3xl p-8 backdrop-blur-sm border border-blue-600/30">
                <div className="grid grid-cols-3 gap-4">
                  {['🖥️', '⚙️', '🔘', '〰️', '💡', '📊', '🛡️', '⚡', '🔌'].map((icon, idx) => (
                    <div key={idx} className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition-colors cursor-pointer">
                      <span className="text-4xl">{icon}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-yellow-400 text-blue-900 px-6 py-3 rounded-full font-semibold shadow-lg">
                All Major Brands Available!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Brands Section
function Brands() {
  const brands = ['Siemens', 'ABB', 'Schneider', 'Allen Bradley', 'Mitsubishi', 'Delta', 'Omron', 'Philips', 'Havells', 'Polycab', 'Legrand', 'Danfoss'];
  
  return (
    <section className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-gray-600 mb-8 font-medium">Trusted Brands We Deal In</p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {brands.map((brand, idx) => (
            <div key={idx} className="bg-white px-6 py-3 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <span className="text-gray-700 font-semibold">{brand}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Products Section
function Products() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'all' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="products" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Products</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Explore our wide range of electrical spare parts from leading brands. Click on any product to inquire via WhatsApp.</p>
        </div>
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
          </div>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-10">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="mr-1">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>
        
        {/* Products Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 flex items-center justify-center group-hover:from-blue-50 group-hover:to-blue-100 transition-colors">
                <span className="text-6xl">{product.image}</span>
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">{product.brand}</span>
                  <span className="text-xs text-gray-500 capitalize">{categories.find(c => c.id === product.category)?.name}</span>
                </div>
                <h3 className="font-bold text-gray-900 mb-2 line-clamp-1">{product.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                <button
                  onClick={() => openWhatsApp(product.name, product.brand)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center space-x-2"
                >
                  <span>📱</span>
                  <span>Inquire on WhatsApp</span>
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found matching your search.</p>
          </div>
        )}
        
        <div className="text-center mt-10">
          <p className="text-gray-600 mb-4">Can't find what you're looking for?</p>
          <button
            onClick={() => openWhatsApp('Custom Product Inquiry', 'Various')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-full transition-colors inline-flex items-center space-x-2"
          >
            <span>📱</span>
            <span>Contact Us for Any Product</span>
          </button>
        </div>
      </div>
    </section>
  );
}

// Features Section
function Features() {
  const features = [
    { icon: '🏆', title: 'Genuine Products', description: 'We stock only authentic products from authorized distributors' },
    { icon: '🚚', title: 'Fast Delivery', description: 'Quick and reliable delivery across the region' },
    { icon: '💼', title: 'Expert Support', description: 'Technical guidance from experienced professionals' },
    { icon: '💳', title: 'Easy Payment', description: 'Multiple payment options for your convenience' },
    { icon: '📦', title: 'Bulk Orders', description: 'Special pricing for bulk and repeat orders' },
    { icon: '🔄', title: 'After Sales', description: 'Complete after-sales support and warranty services' },
  ];
  
  return (
    <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us?</h2>
          <p className="text-blue-200 max-w-2xl mx-auto">We are committed to providing the best service and quality products to our valued customers.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-colors">
              <span className="text-4xl mb-4 block">{feature.icon}</span>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-blue-200">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// About Section
function About() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">About Ram Electricals</h2>
            <div className="space-y-4 text-gray-600">
              <p className="text-lg leading-relaxed">
                Ram Electricals Spare Parts has been a trusted name in the electrical industry for over 15 years. We specialize in providing high-quality electrical spare parts and components for industrial, commercial, and residential applications.
              </p>
              <p className="text-lg leading-relaxed">
                Our extensive product range includes Siemens PLCs, VFDs, motors, switchgear, cables, lighting solutions, instrumentation, and safety equipment from all major brands.
              </p>
              <p className="text-lg leading-relaxed">
                We are committed to delivering genuine products, competitive pricing, and exceptional customer service. Our experienced team is always ready to assist you with technical guidance and product selection.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <div className="bg-white rounded-xl p-4 shadow-md">
                <p className="text-3xl font-bold text-blue-600">02+</p>
                <p className="text-sm text-gray-500">Years in Business</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
                <p className="text-3xl font-bold text-blue-600">500+</p>
                <p className="text-sm text-gray-500">Products</p>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md">
               
              </div>
            </div>
          </div>
          <div className="bg-white rounded-3xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Commitment</h3>
            <ul className="space-y-4">
              {[
                '✅ 100% Genuine Products',
                '✅ Quality Assurance',
                '✅ Competitive Pricing',
                '✅ Technical Support',
                '✅ Timely Delivery',
                '✅ After-Sales Service',
                '✅ Bulk Order Discounts',
                '✅ Expert Consultation'
              ].map((item, idx) => (
                <li key={idx} className="text-lg text-gray-700">{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

// Contact Section
function Contact() {
  return (
    <section id="contact" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Contact Us</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">Get in touch with us for any inquiries, quotes, or product information. We're here to help!</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Address */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📍</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Visit Our Store</h3>
            <p className="text-gray-600">
              Ram Electricals Spare Parts<br />
              Kumbhephal,Shendra<br />
              Industrial Area,Chatrapati Sambhajinagar- 431001
            </p>
          </div>
          
          {/* Phone */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📞</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Call Us</h3>
            <p className="text-gray-600">
              +91 8600492533<br />
              
              Mon - Sat: 9:00 AM - 7:00 PM
            </p>
            <a 
              href="tel:+918600492533"
              className="inline-block mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full transition-colors"
            >
              Call Now
            </a>
          </div>
          
          {/* WhatsApp */}
          <div className="bg-gray-50 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">📱</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">WhatsApp</h3>
            <p className="text-gray-600">
              Quick responses for product inquiries<br />
              and quotations
            </p>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
        
        {/* Quick Inquiry Form */}
        <div className="mt-12 bg-gradient-to-br from-blue-900 to-blue-800 rounded-3xl p-8 md:p-12">
          <div className="max-w-2xl mx-auto text-center text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">Quick Inquiry</h3>
            <p className="text-blue-200 mb-8">Need a quote for specific products? Send us your requirements directly on WhatsApp!</p>
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hello, I would like to inquire about electrical spare parts. Please share your product catalog and pricing details.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-8 py-4 rounded-full transition-all transform hover:scale-105 shadow-lg"
            >
              <span className="text-2xl">📱</span>
              <span>Send Inquiry on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo & Description */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="bg-yellow-400 p-2 rounded-lg">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Ram Electricals</h3>
                <p className="text-sm text-gray-400">Spare Parts</p>
              </div>
            </div>
            <p className="text-gray-400 mb-6">
              Your trusted partner for all electrical spare parts. Quality products, expert guidance, and reliable service since 2009.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-blue-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                📘
              </a>
              <a href="#" className="bg-gray-800 hover:bg-pink-600 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                📸
              </a>
              <a href="#" className="bg-gray-800 hover:bg-blue-400 w-10 h-10 rounded-full flex items-center justify-center transition-colors">
                🐦
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Products</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          
          {/* Categories */}
          <div>
            <h4 className="font-bold text-lg mb-4">Categories</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#products" className="hover:text-white transition-colors">PLC & Automation</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Motors & Drives</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Switches & Breakers</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Cables & Wires</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Ram Electricals Spare Parts. Design-Dhananjay Misal.</p>
        </div>
      </div>
    </footer>
  );
}

// Floating WhatsApp Button
function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white w-16 h-16 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110 z-50"
      title="Chat on WhatsApp"
    >
      <span className="text-3xl">📱</span>
    </a>
  );
}

// Main App Component
export default function App() {
  return (
    <div className="font-['Poppins',sans-serif] min-h-screen bg-white">
      <Header />
      <Hero />
      <Brands />
      <Products />
      <Features />
      <About />
      <Contact />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}
