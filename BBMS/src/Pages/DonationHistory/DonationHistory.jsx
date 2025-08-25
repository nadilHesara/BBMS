
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { LoadingContext } from '../../context/LoadingContext';
import useVerifyAccess from "../../SharedData/verifyFunction";
import { Heart, Calendar, MapPin, Award, Users, ExternalLink, User, Hospital  } from 'lucide-react';


function DonationHistory({ theme, setTheme }) {
    useVerifyAccess("DonationForm");    
    const [donations, setDonations] = useState([]);
    const { loading, setLoading } = useContext(LoadingContext);
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const user_Type = sessionStorage.getItem("userType");
    const userID = sessionStorage.getItem("userId");

    useEffect(() => {
        try {
            setLoading(true);
            if (userID) {
                axios.get(`http://localhost:9191/dashboard/donations?user_id=${userID}`)
                    .then(res => {
                        setDonations(res.data);
                        console.log(donations);
                        console.log(res.data);
                    })
                    .catch(err => console.error(err));
            }
        } catch (error) {
            console.error("Error fetching donation history:", error);
        } finally {
            setLoading(false);
        }

    }, [user_Type, userID]);

    const formatDate = (dateString) => {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    return (
        <div className="min-h-screen   p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header Section */}
                <div className=" bg-red-200 p-3 w-full sm:mb-12 rounded-2xl dark:bg-gray-600">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3 text-gray-900 dark:text-white">
                            
                            <div className='ml-8'>
                                <h1 className="text-3xl mb-3 sm:text-[50px] font-bold ">
                                    Donation History
                                </h1>
                                <p className=" mt-1">
                                    Track your life-saving contributions
                                </p>
                            </div>
                        </div>
                        
                        {donations.length > 0 && (
                            <div className="flex flex-col sm:flex-row gap-4">
                                <div className="bg-white  rounded-xl p-4 shadow-lg border border-gray-200 dark:!bg-gray-700 ">
                                    <div className="flex items-center gap-2">
                                        <Award className="w-5 h-5 text-yellow-500" />
                                        <span className="text-sm text-gray-600 dark:!text-gray-200">Total Donations</span>
                                    </div>
                                    <div className="flex text-4xl font-bold text-gray-900 justify-center dark:!text-gray-200 mt-1">
                                        {donations.length}
                                    </div>
                                </div>
                                <div className="flex-column justify-center bg-white dark:!bg-gray-700 rounded-xl p-4 shadow-lg border border-gray-200 ">
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-green-500" />
                                        <span className="text-sm text-gray-600 dark:!text-gray-200">Lives Impacted</span>
                                    </div>
                                    <div className="flex justify-center text-4xl font-bold text-gray-900 dark:!text-white mt-1">
                                        {donations.length * 3}
                                    </div>
                                    <div className="text-xs text-gray-500 dark:!text-gray-200 mt-1">
                                        Estimated impact
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Content Section */}
                {donations.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 sm:py-24">
                        <div className="bg-white dark:!bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-8 sm:p-12 max-w-2xl mx-auto text-center">
                            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:!bg-gray-700 rounded-full flex items-center justify-center">
                                <Heart className="w-12 h-12 text-gray-400 dark:text-gray-500" />
                            </div>
                            
                            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                No donations yet
                            </h3>
                            
                            <p className="text-gray-600 dark:text-gray-400 text-lg mb-2">
                                You haven't donated blood through any campaigns so far.
                            </p>
                            
                            <p className="text-gray-500 dark:text-gray-500 mb-8">
                                Every donation can save up to 3 lives. Start your journey of making a difference today.
                            </p>
                            
                            <a 
                                href="/dashboard" 
                                className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                            >
                                <ExternalLink className="w-5 h-5" />
                                Explore Campaigns
                            </a>
                            
                            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">Save Lives</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">Help those in need</div>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <Users className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">Build Community</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">Connect with others</div>
                                </div>
                                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                                    <Award className="w-6 h-6 text-green-500 mx-auto mb-2" />
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">Make Impact</div>
                                    <div className="text-xs text-gray-600 dark:text-gray-400">Track your contribution</div>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="grid gap-6 sm:gap-8">
                            {donations.map((donation, index) => (
                                <div 
                                    key={donation.donate_id || index} 
                                    className="bg-white dark:!bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:!border-gray-700 overflow-hidden group"
                                >
                                    <div className="p-6 sm:p-8">
                                        <div className="flex flex-col sm:flex-row items-start justify-between gap-4 sm:gap-6">
                                            <div className="flex-1 space-y-4">
                                                <div className="flex items-start gap-4">
                                                    <div className="p-3 bg-red-100 dark:!bg-red-900/30 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                                        <Heart className="w-6 h-6 text-red-600 dark:!text-red-400" />
                                                    </div>
                                                    <div>
                                                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:!text-white mb-2">
                                                            Donation #{index + 1}
                                                        </h3>
                                                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:!text-gray-400">
                                                            <Calendar className="w-4 h-4" />
                                                            <span>{formatDate(donation.date)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-0 sm:pl-16">
                                                    <div className="space-y-3">
                                                        <div className="flex items-start gap-3">
                                                            <div className="p-2 bg-blue-100 dark:!bg-blue-900/30 rounded-lg">
                                                                <Users className="w-4 h-4 text-blue-600 dark:!text-blue-400" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-500 dark:!text-gray-400">
                                                                    Campaign Organization
                                                                </div>
                                                                <div className="text-base font-semibold text-gray-900 dark:!text-white">
                                                                    {donation.CampaignName}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <div className="flex items-start gap-3">
                                                            <div className="p-2 bg-pink-200 dark:!bg-green-900/30 rounded-lg">
                                                                <User className="w-4 h-4 text-red-600 dark:!text-green-400" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-500 dark:!text-gray-400">
                                                                    Organizer
                                                                </div>
                                                                <div className="text-base font-semibold text-gray-900 dark:!text-white">
                                                                    {donation.org_name}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <div className="flex items-start gap-3">
                                                            <div className="p-2 bg-gray-300 dark:!bg-green-900/30 rounded-lg">
                                                                <Hospital className="w-4 h-4 text-black dark:!text-green-400" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-500 dark:!text-gray-400">
                                                                    Blood Transferred to
                                                                </div>
                                                                <div className="text-base font-semibold text-gray-900 dark:!text-white">
                                                                    {donation.HospitalName}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    
                                                    <div className="space-y-3">
                                                        <div className="flex items-start gap-3">
                                                            <div className="p-2 bg-green-100 dark:!bg-green-900/30 rounded-lg">
                                                                <MapPin className="w-4 h-4 text-green-600 dark:!text-green-400" />
                                                            </div>
                                                            <div>
                                                                <div className="text-sm font-medium text-gray-500 dark:!text-gray-400">
                                                                    Location
                                                                </div>
                                                                <div className="text-base font-semibold text-gray-900 dark:!text-white">
                                                                    {donation.district}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    
                                                </div>
                                            </div>
                                            
                                            <div className="flex-shrink-0">
                                                <div className="bg-gradient-to-r from-red-500 to-pink-500 text-white p-4 rounded-xl text-center min-w-[120px]">
                                                    <div className="text-sm font-medium opacity-90">Impact</div>
                                                    <div className="text-2xl font-bold">~3</div>
                                                    <div className="text-xs opacity-75">Lives Saved</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div className="px-6 sm:px-8 py-4 bg-gray-50 dark:!bg-gray-700/50 border-t border-gray-200 dark:!border-gray-600">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-gray-600 dark:!text-gray-400">
                                                Thank you for your generous contribution! 🙏
                                            </div>
                                            <div className="text-xs text-gray-500 dark:!text-gray-500">
                                                Donation ID: {donation.donate_id || `DN-${index + 1}`}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Achievement Section */}
                        <div className="mt-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl p-4 sm:p-8 text-white text-center dark:!bg-gradient-to-r from-blue-900 to-purple-900">
                            <Award className="w-12 h-12 mx-auto mb-4 opacity-90" />
                            <h3 className="text-2xl font-bold mb-2">Congratulations!</h3>
                            <p className="text-lg opacity-90 mb-4">
                                You've made {donations.length} life-saving donation{donations.length !== 1 ? 's' : ''}
                            </p>
                            <div className="flex flex-col sm:flex-row justify-center items-center gap-6 text-center">
                                <div>
                                    <div className="text-3xl font-bold">{donations.length * 3}</div>
                                    <div className="text-sm opacity-75">Estimated Lives Impacted</div>
                                </div>
                                <div className="hidden sm:block w-px h-12 bg-white/30"></div>
                                <div>
                                    <div className="text-3xl font-bold">{donations.length * 450}ml</div>
                                    <div className="text-sm opacity-75">Total Blood Donated</div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default DonationHistory;