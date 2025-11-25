'use client'

import React, { useState } from 'react'

import PageAcquireLandDueDiligence from '@/components/co-ownership/PageAcquireLandDueDiligence';
import PageAcquireLandFinalize from '@/components/co-ownership/PageAcquireLandFinalize';
import PageAcquireLandListing from '@/components/co-ownership/PageAcquireLandListing';
import PageAcquireLandStart from '@/components/co-ownership/PageAcquireLandStart';
import PageChat from '@/components/co-ownership/PageChat';
import PageDeposit from '@/components/co-ownership/PageDeposit';
import PageDone from '@/components/co-ownership/PageDone';
import PageFormalize from '@/components/co-ownership/PageFormalize';
import PageGoals from '@/components/co-ownership/PageGoals';
import PageMatches from '@/components/co-ownership/PageMatches';
import PagePlan from '@/components/co-ownership/PagePlan';
import PageStart from '@/components/co-ownership/PageStart';
import { toast } from 'react-toastify';
import { User } from '@/types';


// Simple state object to store data and prevent repetition
const initialUserState = {
    goals: {
        location: 'Lekki, Lagos',
        projectType: 'Raw Land / Farm',
        budget: '75000000',
    },
    partner: '',
};

// Define the full, combined flow
const flowSteps = [
  { id: 'page-start', label: 'Start' },
  { id: 'page-goals', label: 'Goals' },
  { id: 'page-matches', label: 'Matches' },
  { id: 'page-chat', label: 'Chat' },
  { id: 'page-formalize', label: 'Formalize' },
  { id: 'page-plan', label: 'Plan' },
  { id: 'page-deposit', label: 'Deposit' },
  // Seamless transition happens here
  { id: 'page-acquire-land-start', label: 'Acquire' },
  { id: 'page-acquire-land-listings', label: 'Listings' },
  { id: 'page-acquire-land-due-diligence', label: 'Diligence' },
  { id: 'page-acquire-land-finalize', label: 'Finalize' },
  { id: 'page-done', label: 'Complete' }
];

// --- Reusable Stepper Component ---

const Stepper = ({ steps, currentStepId }: { steps: any, currentStepId:any }) => {
    const currentStepIndex = steps.findIndex((step: any) => step.id === currentStepId);

    return (
        <div className="flex items-start mb-8 sm:mb-12">
            {steps.map((step: any, index: number | any) => {
                let statusClass = '';
                if (index < currentStepIndex) {
                    statusClass = 'completed';
                } else if (index === currentStepIndex) {
                    statusClass = 'active';
                }

                let dotContent = index + 1;
                if (statusClass === 'completed') {
                    dotContent = '✓'; // Checkmark
                }
                
                // Helper classes for Tailwind JIT
                // active: bg-main-100 text-white text-main-100
                // completed: bg-main-100 text-white text-main-100
                
                const dotClasses = `w-10 h-10 flex items-center justify-center rounded-full z-10 transition-all duration-300 ${
                    statusClass === 'active' || statusClass === 'completed'
                        ? 'bg-main-100 text-white'
                        : 'bg-gray-300 text-gray-600'
                }`;
                
                const lineClasses = `h-1 w-full -mt-5 transition-all duration-300 ${
                    statusClass === 'completed' ? 'bg-main-100' : 'bg-gray-300'
                }`;

                const labelClasses = `text-xs sm:text-sm text-center mt-2 font-medium transition-all duration-300 ${
                    statusClass === 'active' || statusClass === 'completed'
                        ? 'text-main-100'
                        : 'text-gray-500'
                }`;

                return (
                    <div key={step.id} onClick={() => toast.info("Proceeding...")} className="flex flex-col items-center w-full cursor-pointer">
                        <div className="flex items-center w-full">
                            {/* Connector line (not for first item) */}
                            {index > 0 ? <div className={`${lineClasses} flex-1`}></div> : <div className="flex-1"></div>}
                            
                            {/* Dot */}
                            <div className={dotClasses}>{dotContent}</div>
                            
                            {/* Connector line (not for last item) */}
                            {index < steps.length - 1 ? <div className={`${lineClasses} flex-1`}></div> : <div className="flex-1"></div>}
                        </div>
                        <p className={labelClasses}>{step.label}</p>
                    </div>
                );
            })}
        </div>
    );
};


function PageRenderer({user, client}: {user: User, client: any}) {

    const [userState, setUserState] = useState(initialUserState);
    const [currentPageId, setCurrentPageId] = useState(flowSteps[0].id);

    const handleNextPage = (pageId: string) => {
        // Reset to start if 'page-start' is clicked from the end
        if (pageId === 'page-start') {
            setUserState(initialUserState);
            setCurrentPageId('page-start');
        } else {
            setCurrentPageId(pageId);
        }
    };

    const renderPage = () => {
        switch (currentPageId) {
            case 'page-start':
                return <PageStart onNext={handleNextPage} />;
            case 'page-goals':
                return <PageGoals onNext={handleNextPage} userState={userState} setUserState={setUserState} user={user} client={client}/>;
            case 'page-matches':
                return <PageMatches onNext={handleNextPage} setUserState={setUserState} />;
            case 'page-chat':
                return <PageChat onNext={handleNextPage} userState={userState} client={client} />;
            case 'page-formalize':
                return <PageFormalize onNext={handleNextPage} userState={userState} user={user} />;
            case 'page-plan':
                return <PagePlan onNext={handleNextPage} userState={userState} />;
            case 'page-deposit':
                return <PageDeposit onNext={handleNextPage} user={user}/>;
            case 'page-acquire-land-start':
                return <PageAcquireLandStart onNext={handleNextPage} userState={userState} />;
            case 'page-acquire-land-listings':
                return <PageAcquireLandListing onNext={handleNextPage} />;
            case 'page-acquire-land-due-diligence':
                return <PageAcquireLandDueDiligence onNext={handleNextPage} />;
            case 'page-acquire-land-finalize':
                return <PageAcquireLandFinalize onNext={handleNextPage} />;
            case 'page-done':
                return <PageDone onNext={handleNextPage} />;
            default:
                return <PageStart onNext={handleNextPage} />;
        }
    };

  return (
    <div>
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6 sm:mb-10">Your Co-Ownership Journey</h1>
        <Stepper steps={flowSteps} currentStepId={currentPageId} />

        {/* Main App Container */}
        <div className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 w-full">
            {renderPage()}
        </div>
    </div>
  )
}

export default PageRenderer
