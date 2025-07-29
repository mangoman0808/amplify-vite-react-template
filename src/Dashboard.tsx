import React, { useState, useEffect } from 'react';
import type { Schema } from '../amplify/data/resource';
import { generateClient } from 'aws-amplify/data';
//import TasksPage from './TasksPage';

const client = generateClient<Schema>();

// --- ICON COMPONENTS ---
const HomeIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>);
const UsersIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>);
const CalendarIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" /></svg>);
const DollarSignIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" x2="12" y1="2" y2="22" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>);
const UsersRoundIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>);
const LogOutIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>);
const CheckSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>);

// --- UI SUB-COMPONENTS ---
const Sidebar = ({ activePage, setActivePage, onLogout }: { activePage: string, setActivePage: (page: string) => void, onLogout: () => void }) => {
    const navItems = [
        { name: 'Dashboard', icon: HomeIcon }, 
        { name: 'Members', icon: UsersIcon }, 
        { name: 'Groups', icon: UsersRoundIcon },
        { name: 'Events', icon: CalendarIcon }, 
        { name: 'Tasks', icon: CheckSquareIcon },
        { name: 'Donations', icon: DollarSignIcon }
    ];
    return (<aside className="bg-gray-800 text-white w-64 space-y-6 py-7 px-2 flex flex-col flex-shrink-0"><div className="px-4 text-white flex items-center space-x-2"><svg className="w-8 h-8 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v11.494m-9-5.747h18"></path></svg><span className="text-2xl font-extrabold">Unify</span></div><nav className="flex-grow">{navItems.map(item => (<a key={item.name} href="#" onClick={(e) => { e.preventDefault(); setActivePage(item.name); }} className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200 ${activePage === item.name ? 'bg-indigo-600' : 'hover:bg-gray-700'}`}><item.icon className="w-6 h-6" /><span>{item.name}</span></a>))}</nav><div><a href="#" onClick={onLogout} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200"><LogOutIcon className="w-6 h-6" /><span>Logout</span></a></div></aside>);
};
const Header = ({ title }: { title: string }) => (<div className="bg-white shadow-sm p-4 flex justify-between items-center"><h1 className="text-2xl font-bold text-gray-800">{title}</h1></div>);
const StatCard = ({ title, value, icon, color }: { title: string, value: string | number, icon: React.ElementType, color: string }) => { const Icon = icon; return (<div className="bg-white p-5 rounded-xl shadow-md flex items-center space-x-4"><div className={`p-3 rounded-full bg-${color}-100 text-${color}-600`}><Icon className="w-7 h-7" /></div><div><p className="text-gray-500 text-sm font-medium">{title}</p><p className="text-3xl font-bold text-gray-800">{value}</p></div></div>); };
const DashboardContent = ({ members, events, donations }: { members: Schema['Member']['type'][], events: Schema['Event']['type'][], donations: Schema['Donation']['type'][] }) => (<div className="p-6 space-y-6"><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><StatCard title="Total Members" value={members.length} icon={UsersIcon} color="indigo" /><StatCard title="Upcoming Events" value={events.length} icon={CalendarIcon} color="green" /><StatCard title="Weekly Donations" value={`$${donations.reduce((sum, d) => sum + d.amount, 0).toFixed(2)}`} icon={DollarSignIcon} color="yellow" /></div></div>);

export default function DashboardPage({ 
    signOut, user 
}: {
    signOut: () => void | Promise<void>;
    user: any; // Replace 'any' with a more specific type if available
}) {
  const [activePage, setActivePage] = useState('Dashboard');
  const [isLoading, setIsLoading] = useState(true);
  const [members, setMembers] = useState<Schema['Member']['type'][]>([]);
  const [events, setEvents] = useState<Schema['Event']['type'][]>([]);
  const [donations, setDonations] = useState<Schema['Donation']['type'][]>([]);

  useEffect(() => {
    const fetchData = async () => {
        setIsLoading(true);
        try {
            const [memberData, eventData, donationData] = await Promise.all([
                client.models.Member.list(),
                client.models.Event.list(),
                client.models.Donation.list()
            ]);
            setMembers(memberData.data);
            setEvents(eventData.data);
            setDonations(donationData.data);
        } catch (err) {
            console.error("Error fetching data:", err);
        } finally {
            setIsLoading(false);
        }
    };
    fetchData();
  }, []);

  const getHeaderTitle = () => activePage === "Dashboard"
    ? `Welcome, ${user?.signInDetails?.loginId || user?.username || "Admin"}!`
    : activePage;

  const renderContent = () => {
    if (isLoading && activePage === 'Dashboard') {
        return <div className="p-8 text-center">Loading Data...</div>;
    }
    switch (activePage) {
        case 'Dashboard': return <DashboardContent members={members} events={events} donations={donations} />;
        //case 'Tasks': return <TasksPage />;
        // Add cases for other pages here
        default: return <div className="p-6">{activePage} page coming soon.</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
        <Sidebar activePage={activePage} setActivePage={setActivePage} onLogout={signOut} />
        <div className="flex-1 flex flex-col overflow-hidden">
            <Header title={getHeaderTitle()} />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
                {renderContent()}
            </main>
        </div>
    </div>
  );
}
