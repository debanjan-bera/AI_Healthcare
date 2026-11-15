import React from 'react';

const SocialLogins: React.FC = () => {
  return (
    <>
      <div className="relative flex items-center py-10">
        <div className="flex-grow border-t border-outline-variant"></div>
        <span className="flex-shrink mx-4 font-label-sm text-label-sm text-outline-variant">OR CONTINUE WITH</span>
        <div className="flex-grow border-t border-outline-variant"></div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <button type="button" className="flex items-center justify-center gap-3 py-4 border border-outline-variant rounded-2xl hover:bg-surface-container-low transition-colors active:scale-[0.98] cursor-pointer bg-transparent">
          <img alt="Google" className="w-5 h-5" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACrtoKT8inKzKbkT3c8CCzP_pk4-KRoRK-Zo2KUfHWZDP41U4sWQajAWBqCzINzosj7Eq9Dt6dBQ_u60WwisPkWX_uarZrAI0CujeX1gkfNVj9RWyMYJBOrw4ls70J3dj3NCz5yHN2JAVlKlNqVuDp5Kg7qJ7uAIgsDew7HIiSElouUHefRxmY165uMedl5EwvGrtWTl7meVk6wfxN25qUbTyw5jDovaO_pvQxHmGPI7XoFpRfiKvFL7TkKt0qCOMqGF8FLDkefm5V" />
          <span className="font-label-md text-label-md text-on-surface">Google</span>
        </button>
        <button type="button" className="flex items-center justify-center gap-3 py-4 border border-outline-variant rounded-2xl hover:bg-surface-container-low transition-colors active:scale-[0.98] cursor-pointer bg-transparent">
          <span className="material-symbols-outlined text-on-surface" style={{ fontVariationSettings: "'FILL' 1" }}>ios</span>
          <span className="font-label-md text-label-md text-on-surface">Apple</span>
        </button>
      </div>
    </>
  );
};

export default SocialLogins;
