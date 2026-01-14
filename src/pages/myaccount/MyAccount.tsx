import { Button } from '@/components/ui/button';
import { Columns3, List, Plus, TriangleAlert } from 'lucide-react';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyAccount = () => {
    const navigate = useNavigate();
  const tabs = [
    { id: 'Real', label: 'Real' },
    { id: 'Demo', label: 'Demo' },
    { id: 'Archived', label: 'Archived' }
  ];

  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (

    <div className="space-y-6"> 
     
{/* Tabs - Customers style */}
      <div className="bg-card rounded-xl border border-border p-4 mb-6">
        <div className="flex items-center gap-2 flex-wrap">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 border rounded-md transition-colors text-sm font-medium ${
                activeTab === tab.id ? "bg-primary text-primary-foreground" : ""
              }`}
            >
              {tab.label}
            </button>
          ))}
          <div className="ml-auto flex gap-3">
            <Button>
                 <Columns3 />
            </Button>
            
              <Button variant='outline'><List  /></Button> 
            <Button onClick={() => navigate("/user/new-account/real")}>
               <Plus /> Open New Real Account
    
            </Button>
            <Button onClick={() => navigate("/user/new-account/demo")}>
               <Plus /> Open New Demo Account
    
            </Button>
          </div>
        </div>
      </div>

      
   

      {/* Content */}
      <div className="p-6 rounded shadow-md border border-border bg-card rounded-xl">
        {activeTab === 'Real' && (
          <div className="text-center">
            <div className="icon mb-4 flex justify-center">
              <span className="text-red-500 "><TriangleAlert size={50}/></span>
            </div>
            <p className="text-lg font-semibold mb-2">You have not opened a real account yet.</p>
            <p className="text-sm text-gray-600">
              To do so, ensure you have completed your KYC verification and then click on the open new account button on this screen.
            </p>
          </div>
        )}
         {activeTab === 'Demo' && (
          <div className="text-center">
            <div className="icon mb-4 flex justify-center">
              <span className="text-red-500 "><TriangleAlert size={50}/></span>
            </div>
            <p className="text-lg font-semibold mb-2">You have not opened a demo account yet.</p>
            <p className="text-sm text-gray-600">
              To do so, ensure you have completed your KYC verification and then click on the open new account button on this screen.
            </p>
          </div>
        )}
         {activeTab === 'Archived' && (
          <div className="text-center">
            <div className="icon mb-4 flex justify-center">
              <span className="text-red-500 "><TriangleAlert size={50}/></span>
            </div>
            <p className="text-lg font-semibold mb-2">You don't have any Archive account.</p>
           
          </div>
        )}
        {/* Add content for other tabs if needed */}
      </div>

    
    </div>
  );
};

export default MyAccount;