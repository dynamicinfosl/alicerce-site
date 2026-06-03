import { useState, useEffect, FormEvent } from 'react';
import {
  LayoutDashboard, Users, ClipboardList, LogOut, CheckCircle, Clock,
  Trash2, UserPlus, ShieldAlert, Key, Mail, Phone, MapPin, Plus, FileText, Check, X
} from 'lucide-react';
import gsap from 'gsap';
import { supabaseFetch } from '../utils/supabase';

interface Quote {
  id: string;
  date: string;
  name: string;
  email: string;
  phone: string;
  serviceType: string;
  location: string;
  area: string;
  frequency: string;
  message: string;
  status: 'Pendente' | 'Em Contacto' | 'Concluído';
}

interface Collaborator {
  email: string;
  password?: string;
  name: string;
  role: 'Administrador' | 'Colaborador';
  createdAt: string;
}

const mapDbQuote = (dbQuote: any): Quote => ({
  id: dbQuote.id,
  date: dbQuote.created_at,
  name: dbQuote.nome,
  email: dbQuote.email,
  phone: dbQuote.telefone,
  serviceType: dbQuote.tipo_servico,
  location: dbQuote.localizacao,
  area: dbQuote.area_m2 ? dbQuote.area_m2.toString() : "Não informado",
  frequency: dbQuote.frequencia,
  message: dbQuote.mensagem,
  status: dbQuote.status || 'Pendente'
});

const mapDbCollab = (dbCollab: any): Collaborator => ({
  name: dbCollab.name,
  email: dbCollab.email,
  password: dbCollab.password,
  role: dbCollab.role,
  createdAt: dbCollab.created_at
});

export default function Admin() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<Collaborator | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Tabs: 'dashboard' | 'quotes' | 'collaborators'
  const [activeTab, setActiveTab] = useState<'dashboard' | 'quotes' | 'collaborators'>('dashboard');

  // Core lists
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [collaborators, setCollaborators] = useState<Collaborator[]>([]);

  // Form states for adding new collaborator
  const [newCollabName, setNewCollabName] = useState('');
  const [newCollabEmail, setNewCollabEmail] = useState('');
  const [newCollabPassword, setNewCollabPassword] = useState('');
  const [newCollabRole, setNewCollabRole] = useState<'Administrador' | 'Colaborador'>('Colaborador');
  const [collabSuccessMsg, setCollabSuccessMsg] = useState('');
  const [collabErrorMsg, setCollabErrorMsg] = useState('');

  // Details Modal
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);

  // Initialize and Load Data from Supabase
  useEffect(() => {
    const loadData = async () => {
      try {
        // 1. Fetch Collaborators
        const dbCollabs = await supabaseFetch('colaboradores?select=*');
        const mappedCollabs = dbCollabs.map(mapDbCollab);
        setCollaborators(mappedCollabs);

        // 2. Fetch Quote Requests
        const dbQuotes = await supabaseFetch('orcamentos?select=*&order=created_at.desc');
        const mappedQuotes = dbQuotes.map(mapDbQuote);
        setQuotes(mappedQuotes);

        // 3. Check Session Persistence
        const activeSession = localStorage.getItem('alicerce_admin_session');
        if (activeSession) {
          const parsedSession = JSON.parse(activeSession);
          // Verify user still exists in colaboradores list
          const userExists = mappedCollabs.find(c => c.email === parsedSession.email);
          if (userExists) {
            setCurrentUser(userExists);
            setIsLoggedIn(true);
          } else {
            localStorage.removeItem('alicerce_admin_session');
          }
        }
      } catch (err: any) {
        console.error("Erro ao carregar dados do Supabase:", err);
      }
    };

    loadData();
  }, []);

  // Handle Login Submit
  const handleLogin = (e: FormEvent) => {
    e.preventDefault();
    setLoginError('');

    const user = collaborators.find(
      c => c.email.toLowerCase() === email.toLowerCase() && c.password === password
    );

    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      // Save session
      localStorage.setItem('alicerce_admin_session', JSON.stringify({ email: user.email }));
      
      // Animate dashboard entrance
      setTimeout(() => {
        gsap.from('.admin-panel-animate', {
          opacity: 0,
          y: 20,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out'
        });
      }, 50);
    } else {
      setLoginError('E-mail ou palavra-passe incorretos.');
    }
  };

  // Handle Logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    setEmail('');
    setPassword('');
    localStorage.removeItem('alicerce_admin_session');
  };

  // Update Quote Status
  const handleStatusChange = async (id: string, newStatus: 'Pendente' | 'Em Contacto' | 'Concluído') => {
    try {
      await supabaseFetch(`orcamentos?id=eq.${id}`, {
        method: 'PATCH',
        body: JSON.stringify({
          status: newStatus
        })
      });

      const updatedQuotes = quotes.map(q => {
        if (q.id === id) {
          return { ...q, status: newStatus };
        }
        return q;
      });
      setQuotes(updatedQuotes);
      
      if (selectedQuote && selectedQuote.id === id) {
        setSelectedQuote({ ...selectedQuote, status: newStatus });
      }
    } catch (err: any) {
      alert(`Erro ao atualizar estado no Supabase: ${err.message}`);
    }
  };

  // Delete Quote
  const handleDeleteQuote = async (id: string) => {
    if (window.confirm('Tem a certeza que deseja eliminar esta solicitação de orçamento?')) {
      try {
        await supabaseFetch(`orcamentos?id=eq.${id}`, {
          method: 'DELETE'
        });

        const updatedQuotes = quotes.filter(q => q.id !== id);
        setQuotes(updatedQuotes);
        setSelectedQuote(null);
      } catch (err: any) {
        alert(`Erro ao eliminar orçamento no Supabase: ${err.message}`);
      }
    }
  };

  // Create Collaborator
  const handleCreateCollab = async (e: FormEvent) => {
    e.preventDefault();
    setCollabErrorMsg('');
    setCollabSuccessMsg('');

    if (!newCollabName || !newCollabEmail || !newCollabPassword) {
      setCollabErrorMsg('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    const emailTaken = collaborators.some(c => c.email.toLowerCase() === newCollabEmail.toLowerCase());
    if (emailTaken) {
      setCollabErrorMsg('Este e-mail já se encontra em uso por outro colaborador.');
      return;
    }

    try {
      await supabaseFetch('colaboradores', {
        method: 'POST',
        body: JSON.stringify({
          name: newCollabName,
          email: newCollabEmail,
          password: newCollabPassword,
          role: newCollabRole
        })
      });

      // Reload collaborators from Supabase
      const dbCollabs = await supabaseFetch('colaboradores?select=*');
      setCollaborators(dbCollabs.map(mapDbCollab));

      // Clear fields
      setNewCollabName('');
      setNewCollabEmail('');
      setNewCollabPassword('');
      setNewCollabRole('Colaborador');
      setCollabSuccessMsg('Colaborador registado com sucesso no Supabase!');

      setTimeout(() => {
        setCollabSuccessMsg('');
      }, 4000);
    } catch (err: any) {
      setCollabErrorMsg(`Erro ao guardar no Supabase: ${err.message}`);
    }
  };

  // Formatting utility for dates
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Translate service types for display
  const translateService = (type: string) => {
    const map: Record<string, string> = {
      'limpeza-residencial': 'Limpeza Residencial',
      'limpeza-comercial': 'Limpeza Comercial',
      'pos-obra': 'Limpeza Pós-Obra',
      'construcao': 'Construção/Remodelação',
      'instalacoes': 'Instalações/Manutenção',
      'outro': 'Outro'
    };
    return map[type] || type;
  };

  // Stats calculation
  const totalRequests = quotes.length;
  const pendingRequests = quotes.filter(q => q.status === 'Pendente').length;
  const contactedRequests = quotes.filter(q => q.status === 'Em Contacto').length;
  const completedRequests = quotes.filter(q => q.status === 'Concluído').length;

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center p-4">
        {/* Decorative Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#38BDF8]/10 rounded-full blur-3xl" />
        </div>

        {/* Login Box */}
        <div className="bg-slate-900/80 backdrop-blur-md border border-slate-800 p-8 rounded-2xl max-w-md w-full shadow-2xl z-10">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-white font-syne flex items-center justify-center gap-2">
              <span className="text-[#38BDF8]"><LayoutDashboard size={28} /></span>
              Painel Administrativo
            </h2>
            <p className="text-slate-400 mt-2 text-sm">
              Faça login para gerir orçamentos e colaboradores
            </p>
          </div>

          {loginError && (
            <div className="mb-6 p-4 bg-red-950/50 border border-red-800 rounded-lg text-red-400 text-sm flex items-center gap-2">
              <ShieldAlert size={18} className="flex-shrink-0" />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Endereço de E-mail
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                  placeholder="admin@alicercegalante.pt"
                />
                <Mail className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">
                Palavra-passe
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm"
                  placeholder="••••••••"
                />
                <Key className="absolute left-3.5 top-3.5 text-slate-500" size={16} />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all shadow-lg hover:shadow-blue-600/20 active:scale-[0.98]"
            >
              Iniciar Sessão
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-800/60 text-center">
            <a
              href="#inicio"
              className="text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors inline-flex items-center gap-1.5"
            >
              ← Voltar ao Website Público
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#1A3A5C] text-white flex flex-col flex-shrink-0">
        {/* Logo area */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <div>
            <div className="font-bold text-lg tracking-wide uppercase">Alicerce Galante</div>
            <div className="text-xs text-blue-300 font-medium">Gestão Comercial</div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-6 bg-slate-900/30 border-b border-white/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-300 font-bold">
            {currentUser?.name.charAt(0)}
          </div>
          <div className="overflow-hidden">
            <h4 className="font-bold text-sm truncate">{currentUser?.name}</h4>
            <p className="text-xs text-slate-300 truncate">{currentUser?.role}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1 flex-1">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'dashboard'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <LayoutDashboard size={18} />
            Painel Geral
          </button>
          
          <button
            onClick={() => setActiveTab('quotes')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'quotes'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <ClipboardList size={18} />
            Orçamentos
            {pendingRequests > 0 && (
              <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                {pendingRequests}
              </span>
            )}
          </button>

          <button
            onClick={() => setActiveTab('collaborators')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'collaborators'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                : 'text-slate-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            <Users size={18} />
            Colaboradores
          </button>
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-white/10">
          <a
            href="#inicio"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-slate-300 hover:bg-white/5 hover:text-white transition-all mb-1 text-left"
          >
            Ver Site Público
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs font-semibold text-red-300 hover:bg-red-950/20 hover:text-red-200 transition-all text-left"
          >
            <LogOut size={16} />
            Terminar Sessão
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 md:p-8">
        
        {/* TAB 1: DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6 admin-panel-animate">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-[#1A3A5C] font-syne">Bem-vindo, {currentUser?.name}</h1>
                <p className="text-slate-500 text-sm">Resumo da atividade comercial do site.</p>
              </div>
              <div className="text-xs font-semibold bg-white py-2 px-4 rounded-lg shadow-sm border border-slate-200 text-slate-600">
                Data do Sistema: 3 de junho de 2026
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-blue-50 text-blue-600">
                  <ClipboardList size={24} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-400">Total Pedidos</div>
                  <div className="text-2xl font-bold text-slate-800">{totalRequests}</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-yellow-50 text-yellow-600">
                  <Clock size={24} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-400">Pendentes</div>
                  <div className="text-2xl font-bold text-slate-800">{pendingRequests}</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-indigo-50 text-indigo-600">
                  <Mail size={24} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-400">Em Contacto</div>
                  <div className="text-2xl font-bold text-slate-800">{contactedRequests}</div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                <div className="p-3.5 rounded-xl bg-green-50 text-green-600">
                  <CheckCircle size={24} />
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-400">Concluídos</div>
                  <div className="text-2xl font-bold text-slate-800">{completedRequests}</div>
                </div>
              </div>
            </div>

            {/* Quick overview of latest leads */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-lg text-[#1A3A5C]">Orçamentos Recentes</h3>
                <button
                  onClick={() => setActiveTab('quotes')}
                  className="text-xs font-bold text-blue-600 hover:text-blue-500 transition-colors"
                >
                  Ver Todos →
                </button>
              </div>

              {quotes.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-sm">
                  Nenhuma solicitação recebida até ao momento.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {quotes.slice(0, 4).map((q) => (
                    <div key={q.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div>
                        <div className="font-bold text-[#1A3A5C]">{q.name}</div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-slate-500">
                          <span className="font-semibold text-blue-600">{translateService(q.serviceType)}</span>
                          <span>•</span>
                          <span>{q.location}</span>
                          <span>•</span>
                          <span>{formatDate(q.date)}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                          q.status === 'Pendente' ? 'bg-red-50 text-red-600 border border-red-100' :
                          q.status === 'Em Contacto' ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                          'bg-green-50 text-green-600 border border-green-100'
                        }`}>
                          {q.status}
                        </span>
                        <button
                          onClick={() => setSelectedQuote(q)}
                          className="text-xs font-bold bg-slate-50 hover:bg-slate-100 border border-slate-200 py-1.5 px-3 rounded-lg text-slate-700 transition-colors"
                        >
                          Ver Detalhes
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: QUOTES MANAGER */}
        {activeTab === 'quotes' && (
          <div className="space-y-6 admin-panel-animate">
            <div>
              <h1 className="text-3xl font-bold text-[#1A3A5C] font-syne">Gerir Orçamentos</h1>
              <p className="text-slate-500 text-sm">Visualização detalhada e atualização do estado das leads comerciais.</p>
            </div>

            {quotes.length === 0 ? (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-12 text-center text-slate-400">
                Nenhum orçamento encontrado.
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Desktop View Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200/80 text-xs font-bold text-slate-500 uppercase tracking-wider">
                        <th className="p-4 pl-6">Data</th>
                        <th className="p-4">Cliente</th>
                        <th className="p-4">Serviço</th>
                        <th className="p-4">Localização</th>
                        <th className="p-4">Área ($m^2$)</th>
                        <th className="p-4">Estado</th>
                        <th className="p-4 pr-6 text-right">Ações</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-sm">
                      {quotes.map((q) => (
                        <tr key={q.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="p-4 pl-6 text-slate-500 text-xs font-medium">
                            {formatDate(q.date)}
                          </td>
                          <td className="p-4">
                            <div className="font-bold text-[#1A3A5C]">{q.name}</div>
                            <div className="text-xs text-slate-400 mt-0.5">{q.email}</div>
                          </td>
                          <td className="p-4 font-semibold text-blue-600">
                            {translateService(q.serviceType)}
                          </td>
                          <td className="p-4 text-slate-600">
                            {q.location}
                          </td>
                          <td className="p-4 text-slate-600">
                            {q.area}
                          </td>
                          <td className="p-4">
                            <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                              q.status === 'Pendente' ? 'bg-red-50 text-red-600 border border-red-100' :
                              q.status === 'Em Contacto' ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                              'bg-green-50 text-green-600 border border-green-100'
                            }`}>
                              {q.status}
                            </span>
                          </td>
                          <td className="p-4 pr-6 text-right space-x-1.5">
                            <button
                              onClick={() => setSelectedQuote(q)}
                              className="inline-flex items-center gap-1 text-xs font-bold bg-slate-50 hover:bg-slate-100 border border-slate-200 py-1.5 px-3 rounded-lg text-slate-700 transition-colors"
                            >
                              Ver
                            </button>
                            <button
                              onClick={() => handleDeleteQuote(q.id)}
                              className="inline-flex items-center justify-center p-2 rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 hover:text-red-600 transition-colors"
                              title="Eliminar"
                            >
                              <Trash2 size={14} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile View Cards */}
                <div className="block lg:hidden divide-y divide-slate-100">
                  {quotes.map((q) => (
                    <div key={q.id} className="p-6 space-y-4 hover:bg-slate-50/50 transition-colors">
                      <div className="flex justify-between items-start gap-4">
                        <div>
                          <div className="font-bold text-[#1A3A5C] text-base">{q.name}</div>
                          <div className="text-xs text-slate-400 mt-0.5">{q.email}</div>
                        </div>
                        <span className={`text-xs px-2.5 py-1 rounded-full font-bold ${
                          q.status === 'Pendente' ? 'bg-red-50 text-red-600 border border-red-100' :
                          q.status === 'Em Contacto' ? 'bg-yellow-50 text-yellow-600 border border-yellow-100' :
                          'bg-green-50 text-green-600 border border-green-100'
                        }`}>
                          {q.status}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div>
                          <span className="text-slate-400 font-semibold block uppercase">Serviço</span>
                          <span className="text-blue-600 font-bold">{translateService(q.serviceType)}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-semibold block uppercase">Localização</span>
                          <span className="text-slate-700 font-medium">{q.location}</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-semibold block uppercase">Área</span>
                          <span className="text-slate-700 font-medium">{q.area} $m^2$</span>
                        </div>
                        <div>
                          <span className="text-slate-400 font-semibold block uppercase">Data</span>
                          <span className="text-slate-700 font-medium">{formatDate(q.date)}</span>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2 border-t border-slate-100">
                        <button
                          onClick={() => setSelectedQuote(q)}
                          className="flex-1 text-center py-2 px-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-slate-700 text-xs font-bold transition-colors"
                        >
                          Ver Detalhes
                        </button>
                        <button
                          onClick={() => handleDeleteQuote(q.id)}
                          className="p-2 rounded-lg border border-red-100 bg-red-50 text-red-500 hover:bg-red-100 transition-colors flex items-center justify-center"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: COLLABORATORS */}
        {activeTab === 'collaborators' && (
          <div className="space-y-6 admin-panel-animate">
            <div>
              <h1 className="text-3xl font-bold text-[#1A3A5C] font-syne">Gerir Colaboradores</h1>
              <p className="text-slate-500 text-sm">Adicione e visualize a equipa com permissões de acesso ao painel.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
              
              {/* Form Card */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 space-y-6 lg:col-span-1">
                <h3 className="font-bold text-lg text-[#1A3A5C] flex items-center gap-2">
                  <UserPlus className="text-blue-600" size={20} />
                  Criar Colaborador
                </h3>

                {collabErrorMsg && (
                  <div className="p-3 bg-red-50 border-l-4 border-red-500 rounded text-red-700 text-xs font-medium">
                    {collabErrorMsg}
                  </div>
                )}
                {collabSuccessMsg && (
                  <div className="p-3 bg-green-50 border-l-4 border-green-500 rounded text-green-700 text-xs font-medium">
                    {collabSuccessMsg}
                  </div>
                )}

                <form onSubmit={handleCreateCollab} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={newCollabName}
                      onChange={(e) => setNewCollabName(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Ex: Carlos Antunes"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      E-mail de Login *
                    </label>
                    <input
                      type="email"
                      required
                      value={newCollabEmail}
                      onChange={(e) => setNewCollabEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="exemplo@gmail.com"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Palavra-passe *
                    </label>
                    <input
                      type="password"
                      required
                      value={newCollabPassword}
                      onChange={(e) => setNewCollabPassword(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder="Defina a palavra-passe"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-600 mb-1.5">
                      Função no Painel *
                    </label>
                    <select
                      value={newCollabRole}
                      onChange={(e: any) => setNewCollabRole(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
                    >
                      <option value="Colaborador">Colaborador (Visualizador)</option>
                      <option value="Administrador">Administrador (Total)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-bold transition-all flex items-center justify-center gap-2 text-sm shadow"
                  >
                    <Plus size={16} />
                    Registar Novo Membro
                  </button>
                </form>
              </div>

              {/* Collaborators List */}
              <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden lg:col-span-2">
                <div className="p-6 border-b border-slate-100">
                  <h3 className="font-bold text-lg text-[#1A3A5C]">Membros da Equipa</h3>
                </div>

                <div className="divide-y divide-slate-100">
                  {collaborators.map((c, index) => (
                    <div key={index} className="p-6 flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-700 uppercase">
                          {c.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-bold text-[#1A3A5C] text-sm flex items-center gap-2">
                            {c.name}
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                              c.role === 'Administrador' ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-50 text-slate-600 border border-slate-150'
                            }`}>
                              {c.role}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 mt-1">{c.email}</div>
                        </div>
                      </div>
                      
                      <div className="text-xs text-slate-400 font-medium">
                        Registado em: {formatDate(c.createdAt).split(' ')[0]}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Quote Details View Modal */}
      {selectedQuote && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSelectedQuote(null)}
          />

          {/* Modal Container */}
          <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6 md:p-8 overflow-hidden z-10 border border-slate-100 flex flex-col animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="flex justify-between items-start mb-6 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                  Pedido de Orçamento
                </span>
                <h3 className="text-2xl font-bold text-[#1A3A5C] font-syne mt-1">
                  Detalhes da Lead
                </h3>
              </div>
              <button
                onClick={() => setSelectedQuote(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1.5 rounded-lg hover:bg-gray-100 flex items-center justify-center"
              >
                <X size={20} />
              </button>
            </div>

            {/* Grid details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm mb-6">
              
              {/* Left Column: Client Data */}
              <div className="space-y-4">
                <div>
                  <label className="text-slate-400 text-xs font-semibold block uppercase">Cliente</label>
                  <span className="text-[#1A3A5C] font-bold text-base">{selectedQuote.name}</span>
                </div>
                <div>
                  <label className="text-slate-400 text-xs font-semibold block uppercase">Contacto de E-mail</label>
                  <a
                    href={`mailto:${selectedQuote.email}`}
                    className="text-blue-600 font-medium hover:underline flex items-center gap-1.5 mt-0.5"
                  >
                    <Mail size={14} />
                    {selectedQuote.email}
                  </a>
                </div>
                <div>
                  <label className="text-slate-400 text-xs font-semibold block uppercase">Telefone</label>
                  <a
                    href={`tel:${selectedQuote.phone}`}
                    className="text-slate-700 font-medium hover:text-[#2563EB] flex items-center gap-1.5 mt-0.5"
                  >
                    <Phone size={14} />
                    {selectedQuote.phone}
                  </a>
                </div>
                <div>
                  <label className="text-slate-400 text-xs font-semibold block uppercase">Data de Entrada</label>
                  <span className="text-slate-600 font-medium">{formatDate(selectedQuote.date)}</span>
                </div>
              </div>

              {/* Right Column: Service Data */}
              <div className="space-y-4">
                <div>
                  <label className="text-slate-400 text-xs font-semibold block uppercase">Serviço Pretendido</label>
                  <span className="text-blue-600 font-bold block mt-0.5 text-base">
                    {translateService(selectedQuote.serviceType)}
                  </span>
                </div>
                <div>
                  <label className="text-slate-400 text-xs font-semibold block uppercase">Localização / Cidade</label>
                  <span className="text-slate-700 font-semibold flex items-center gap-1.5 mt-0.5">
                    <MapPin size={14} className="text-red-500" />
                    {selectedQuote.location}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-slate-400 text-xs font-semibold block uppercase">Área ($m^2$)</label>
                    <span className="text-slate-700 font-semibold">{selectedQuote.area} $m^2$</span>
                  </div>
                  <div>
                    <label className="text-slate-400 text-xs font-semibold block uppercase">Frequência</label>
                    <span className="text-slate-700 font-semibold capitalize">{selectedQuote.frequency}</span>
                  </div>
                </div>
                <div>
                  <label className="text-slate-400 text-xs font-semibold block uppercase">Estado Comercial</label>
                  <div className="flex gap-1.5 mt-1.5">
                    <button
                      onClick={() => handleStatusChange(selectedQuote.id, 'Pendente')}
                      className={`text-xs py-1 px-2.5 rounded-full font-bold border transition-colors ${
                        selectedQuote.status === 'Pendente'
                          ? 'bg-red-50 text-red-600 border-red-300'
                          : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Pendente
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedQuote.id, 'Em Contacto')}
                      className={`text-xs py-1 px-2.5 rounded-full font-bold border transition-colors ${
                        selectedQuote.status === 'Em Contacto'
                          ? 'bg-yellow-50 text-yellow-600 border-yellow-300'
                          : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Contacto
                    </button>
                    <button
                      onClick={() => handleStatusChange(selectedQuote.id, 'Concluído')}
                      className={`text-xs py-1 px-2.5 rounded-full font-bold border transition-colors ${
                        selectedQuote.status === 'Concluído'
                          ? 'bg-green-50 text-green-600 border-green-300'
                          : 'bg-white text-slate-400 border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      Concluído
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Message Details */}
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl mb-6">
              <label className="text-slate-400 text-xs font-bold block uppercase mb-1.5">
                Detalhes Adicionais e Mensagem
              </label>
              <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-wrap">
                {selectedQuote.message}
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
              <button
                onClick={() => handleDeleteQuote(selectedQuote.id)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-700 transition-colors py-2 px-3 hover:bg-red-50 rounded-lg"
              >
                <Trash2 size={14} />
                Eliminar Solicitação
              </button>
              <button
                onClick={() => setSelectedQuote(null)}
                className="py-2.5 px-6 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition-all text-xs"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
