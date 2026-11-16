import React, { createContext, useContext, useState, useEffect } from 'react';
import { INITIAL_OFFERS } from '../data/activeOffersData';
import { api, demoMode } from '../lib/api';
const AppContext = createContext();
const samples = INITIAL_OFFERS.map(offer => ({ ...offer, isSample: true, status: 'Sample preview' }));
export const AppProvider = ({ children }) => {
  const [offers, setOffers] = useState(demoMode ? samples : []);
  const [helpRequests, setHelpRequests] = useState([]);
  const [manager, setManager] = useState(false);
  const [service, setService] = useState(demoMode ? 'demo' : 'loading');
  const [config, setConfig] = useState(null);
  const [activeStepOffer, setActiveStepOffer] = useState(null);
  const [isManagerView, setIsManagerView] = useState(false);
  const [toast, setToast] = useState(null);
  useEffect(() => {
    localStorage.removeItem('riga_help_requests'); localStorage.removeItem('riga_active_offers');
    if (demoMode) return;
    let cancelled = false;
    Promise.all([api('/config'), api('/offers')]).then(([settings, items]) => {
      if (!cancelled) { setConfig(settings); setOffers(items); setService('live'); }
    }).catch(() => { if (!cancelled) setService('unavailable'); });
    return () => { cancelled = true; };
  }, []);
  const refreshRequests = async () => {
    try { setHelpRequests(await api('/manager/requests')); }
    catch (error) { if ([401,403].includes(error.status)) { setManager(false); setHelpRequests([]); } throw error; }
  };
  useEffect(() => {
    if (!isManagerView || service !== 'live') return;
    api('/manager/me').then(() => { setManager(true); return refreshRequests(); }).catch(() => { setManager(false); setHelpRequests([]); });
  }, [isManagerView, service]);
  const showToast = message => { setToast(message); setTimeout(() => setToast(null), 3500); };
  const submitHelpRequest = (data, key) => api('/help-requests', { method: 'POST', body: data, idempotencyKey: key });
  const login = async (username, password) => { await api('/manager/login', { method: 'POST', body: { username, password }, form: true }); setManager(true); await refreshRequests(); };
  const logout = async () => { await api('/manager/logout', { method: 'POST' }); setManager(false); setHelpRequests([]); };
  const addOffer = async offer => { await api('/manager/offers', { method: 'POST', body: offer }); setOffers(await api('/offers')); showToast('Offer saved by the server.'); };
  const removeOffer = async id => { await api(`/manager/offers/${id}`, { method: 'DELETE' }); setOffers(await api('/offers')); };
  const deleteRequest = async id => { await api(`/manager/requests/${id}`, { method: 'DELETE' }); await refreshRequests(); };
  const retryNotification = async id => { await api(`/manager/requests/${id}/retry`, { method: 'POST' }); await refreshRequests(); };
  return <AppContext.Provider value={{ offers, helpRequests, manager, service, config, activeStepOffer, setActiveStepOffer,
    isManagerView, setIsManagerView, submitHelpRequest, login, logout, refreshRequests, addOffer, removeOffer, deleteRequest,
    retryNotification, toast, showToast }}>{children}</AppContext.Provider>;
};
export const useApp = () => useContext(AppContext);
