"use client";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

// Type tanımlamaları
type Card = {
  id: number;
  x: number;
  y: number;
  speed: number;
};

type WorkItem = {
  id: number;
  text: string;
  points: number;
  age: number;
  blocked: boolean;
  type: string;
  assignee: string;
  column: number;
};

type Metrics = {
  ct: number;
  tp: number;
  wip: number;
};

export default function KanbanLanding() {
    const router = useRouter();

    const [scrollY, setScrollY] = useState(0);
    const [flowingCards, setFlowingCards] = useState<Card[]>([
    { id: 1, x: 0, y: 20, speed: 1 },
    { id: 2, x: 0, y: 120, speed: 0.8 },
    { id: 3, x: 0, y: 220, speed: 1.2 }
    ]);
    const [hoveredCard, setHoveredCard] = useState<number | null>(null); // Bu satırı değiştirin
    const [dragState, setDragState] = useState({ dragging: false, card: null, x: 0, y: 0 });
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [metrics, setMetrics] = useState<Metrics>({ ct: 3.2, tp: 42, wip: 8 });

    useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('mousemove', handleMouseMove);
    };
    }, []);

    useEffect(() => {
    const interval = setInterval(() => {
        setFlowingCards(prev => prev.map(card => ({
        ...card,
        x: (card.x + card.speed) % 120
        })));
    }, 50);
    return () => clearInterval(interval);
    }, []);

    useEffect(() => {
    const metricsInterval = setInterval(() => {
        setMetrics(prev => ({
        ct: +(prev.ct + (Math.random() - 0.5) * 0.1).toFixed(1),
        tp: Math.max(35, Math.min(50, prev.tp + Math.floor(Math.random() * 3 - 1))),
        wip: Math.max(5, Math.min(12, prev.wip + Math.floor(Math.random() * 3 - 1)))
        }));
    }, 3000);
    return () => clearInterval(metricsInterval);
    }, []);

  const workItems: WorkItem[] = [
    { 
        id: 1, 
        text: 'Optimize database queries', 
        points: 5, 
        age: 2,
        blocked: false,
        type: 'performance',
        assignee: 'AK',
        column: 0
    },
    { 
        id: 2, 
        text: 'Implement OAuth flow', 
        points: 8, 
        age: 5,
        blocked: true,
        type: 'feature',
        assignee: 'MZ',
        column: 1
    },
    { 
        id: 3, 
        text: 'Fix Safari bug', 
        points: 3, 
        age: 1,
        blocked: false,
        type: 'bug',
        assignee: 'EB',
        column: 1
    }
    ];

  // Bu fonksiyonu düzeltin
    const getAgeColor = (age: number): string => {
    if (age >= 5) return 'bg-red-500';
    if (age >= 3) return 'bg-yellow-500';
    return 'bg-neutral-300';
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 overflow-hidden">
      {/* Ambient Background Effect */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-neutral-100 rounded-full blur-3xl opacity-40"
          style={{
            left: `${mousePos.x - 192}px`,
            top: `${mousePos.y - 192}px`,
            transition: 'all 0.3s ease-out'
          }}
        />
      </div>

      {/* Brutalist Header */}
      <header className="relative z-50 border-b-4 border-neutral-900 bg-white">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-neutral-900 flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white" />
              </div>
              <div>
                <div className="text-2xl font-bold tracking-tighter">KANOTION</div>
                <div className="font-mono text-xs tracking-widest text-neutral-400">FLOW SYSTEM</div>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <div className="flex items-center gap-6 font-mono text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 animate-pulse" />
                  <span className="text-neutral-400">CT</span>
                  <span className="font-bold tabular-nums">{metrics.ct}d</span>
                </div>
                <div className="w-px h-6 bg-neutral-200" />
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">TP</span>
                  <span className="font-bold tabular-nums">{metrics.tp}</span>
                </div>
                <div className="w-px h-6 bg-neutral-200" />
                <div className="flex items-center gap-2">
                  <span className="text-neutral-400">WIP</span>
                  <span className="font-bold tabular-nums">{metrics.wip}/12</span>
                </div>
              </div>
              <button onClick={()=>router.push('/sign-up')}
              className="px-6 py-3 bg-neutral-900 text-white font-mono text-xs tracking-wider hover:bg-neutral-700 transition-all transform hover:scale-105 active:scale-95">
                START
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero - Dramatic */}
      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {flowingCards.map(card => (
            <div
              key={card.id}
              className="absolute w-64 h-32 border-2 border-neutral-200 bg-white shadow-lg"
              style={{
                left: `${card.x}%`,
                top: `${card.y}px`,
                transform: 'rotate(-2deg)',
                transition: 'left 0.05s linear'
              }}
            >
              <div className="p-4">
                <div className="w-12 h-1 bg-neutral-900 mb-3" />
                <div className="space-y-2">
                  <div className="h-2 bg-neutral-100" />
                  <div className="h-2 bg-neutral-100 w-3/4" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <div className="max-w-4xl">
            <div className="mb-8 inline-block">
              <div className="px-4 py-2 border-2 border-neutral-900 font-mono text-xs tracking-widest">
                VISUAL WORK SYSTEM
              </div>
            </div>

            <h1 className="text-[12vw] md:text-[10rem] font-black leading-none tracking-tighter mb-8">
              STOP<br/>
              STARTING
            </h1>

            <div className="flex items-start gap-12 mb-16">
              <div className="text-[12vw] md:text-[10rem] font-black leading-none tracking-tighter opacity-10">
                01
              </div>
              <div className="pt-8 max-w-xl">
                <p className="text-3xl font-light leading-relaxed mb-8">
                  Limit work in progress. Finish what you started. 
                  Flow beats speed every time.
                </p>
                <div className="flex gap-4">
                  <button 
                  onClick={() => router.push('/sign-up') }
                  className="px-8 py-4 bg-neutral-900 text-white font-mono text-sm tracking-wider hover:bg-neutral-700 transition-all transform hover:scale-105 active:scale-95">
                    BEGIN FLOWING
                  </button>
                  <button className="px-8 py-4 border-2 border-neutral-900 font-mono text-sm tracking-wider hover:bg-neutral-900 hover:text-white transition-all">
                    SEE METHOD
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 font-mono text-xs text-neutral-400 animate-bounce"
        >
          SCROLL TO EXPLORE
        </div>
      </section>

      {/* The Board - Asymmetric */}
      <section className="relative py-32 bg-neutral-50" style={{ transform: `translateY(${scrollY * 0.1}px)` }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-8 mb-16">
            <div className="col-span-12 md:col-span-5">
              <div className="sticky top-8">
                <div className="text-8xl font-black text-neutral-100 leading-none mb-4">02</div>
                <h2 className="text-5xl font-black tracking-tighter mb-6">
                  THE<br/>BOARD
                </h2>
                <p className="text-lg text-neutral-600 leading-relaxed mb-8">
                  Three columns. Unlimited clarity. Every task visible. 
                  Every bottleneck exposed. No hiding.
                </p>
                <div className="space-y-4 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-red-500" />
                    <div>
                      <div className="font-bold mb-1">AGED 5+ DAYS</div>
                      <div className="text-neutral-500">Needs attention</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-1 h-8 bg-yellow-500" />
                    <div>
                      <div className="font-bold mb-1">AGED 3+ DAYS</div>
                      <div className="text-neutral-500">Monitor closely</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-7">
              <div className="grid grid-cols-3 gap-4">
                {['BACKLOG', 'DOING', 'DONE'].map((column, colIdx) => (
                  <div key={column}>
                    <div className="mb-4">
                      <div className="font-mono text-xs tracking-widest text-neutral-400 mb-2">
                        {column}
                      </div>
                      {colIdx === 1 && (
                        <div className="inline-block px-2 py-1 border border-neutral-900 font-mono text-xs">
                          WIP 3/3
                        </div>
                      )}
                    </div>

                    <div className="space-y-3">
                      {workItems
                        .filter(item => item.column === colIdx)
                        .map((item) => {
                          const isHovered = hoveredCard === item.id;
                          
                          return (
                            <div
                              key={item.id}
                              onMouseEnter={() => setHoveredCard(item.id)}
                              onMouseLeave={() => setHoveredCard(null)}
                              className={`bg-white border-2 p-4 transition-all duration-300 cursor-pointer ${
                                isHovered 
                                  ? 'border-neutral-900 shadow-2xl transform -translate-y-2 scale-105' 
                                  : 'border-neutral-200 hover:border-neutral-400'
                              } ${
                                item.blocked ? 'bg-red-50' : ''
                              }`}
                            >
                              <div className="flex items-start justify-between mb-3">
                                <div className={`w-1 h-8 ${getAgeColor(item.age)}`} />
                                {item.blocked && (
                                  <div className="px-2 py-1 bg-red-500 text-white font-mono text-xs font-bold">
                                    BLOCKED
                                  </div>
                                )}
                              </div>
                              
                              <p className="text-sm font-medium mb-4 leading-relaxed">
                                {item.text}
                              </p>
                              
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3 font-mono text-xs text-neutral-500">
                                  <span className="font-bold">{item.points}pt</span>
                                  <span>·</span>
                                  <span>{item.age}d</span>
                                </div>
                                <div className="w-8 h-8 bg-neutral-900 text-white flex items-center justify-center font-mono text-xs font-bold">
                                  {item.assignee}
                                </div>
                              </div>

                              {isHovered && (
                                <div className="mt-4 pt-4 border-t border-neutral-200 font-mono text-xs text-neutral-400">
                                  <div className="flex justify-between items-center">
                                    <span>Last update: 2h ago</span>
                                    <span className="text-neutral-900">→ MOVE</span>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flow Diagram - Bold */}
      <section className="relative py-32 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-12 gap-16 items-center">
            <div className="col-span-12 md:col-span-7 order-2 md:order-1">
              <div className="bg-neutral-950 border-2 border-neutral-800 p-8 h-96 relative overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 600 300" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="doneGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.6" />
                    </linearGradient>
                    <linearGradient id="doingGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.3" />
                    </linearGradient>
                    <linearGradient id="backlogGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>
                  
                  {/* Done */}
                  <path
                    d="M 0 300 L 0 250 L 150 230 L 300 200 L 450 180 L 600 160 L 600 300 Z"
                    fill="url(#doneGrad)"
                  />
                  
                  {/* Doing */}
                  <path
                    d="M 0 250 L 0 200 L 150 190 L 300 170 L 450 160 L 600 140 L 600 160 L 450 180 L 300 200 L 150 230 Z"
                    fill="url(#doingGrad)"
                  />
                  
                  {/* Backlog */}
                  <path
                    d="M 0 200 L 0 100 L 150 110 L 300 90 L 450 80 L 600 70 L 600 140 L 450 160 L 300 170 L 150 190 Z"
                    fill="url(#backlogGrad)"
                  />
                </svg>

                <div className="absolute bottom-6 right-6 space-y-2 font-mono text-xs">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-white opacity-90" />
                    <span>DONE</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-white opacity-50" />
                    <span>DOING</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-white opacity-20" />
                    <span>BACKLOG</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-12 md:col-span-5 order-1 md:order-2">
              <div className="text-8xl font-black text-neutral-800 leading-none mb-4">03</div>
              <h2 className="text-5xl font-black tracking-tighter mb-6">
                CUMULATIVE<br/>FLOW
              </h2>
              <p className="text-xl text-neutral-400 leading-relaxed mb-8">
                Widening bands mean trouble. Parallel bands mean predictable flow. 
                The diagram never lies.
              </p>
              <div className="space-y-4">
                <div className="border-l-4 border-white pl-4">
                  <div className="font-mono text-xs text-neutral-500 mb-1">INSIGHT</div>
                  <div className="text-lg">Stable throughput</div>
                </div>
                <div className="border-l-4 border-neutral-600 pl-4">
                  <div className="font-mono text-xs text-neutral-500 mb-1">STATUS</div>
                  <div className="text-lg">System healthy</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics - Grid */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-8xl font-black text-neutral-100 leading-none mb-4">04</div>
          <h2 className="text-5xl font-black tracking-tighter mb-16">METRICS</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: 'CYCLE TIME', value: metrics.ct, unit: 'd', color: 'bg-neutral-900' },
              { label: 'LEAD TIME', value: '5.8', unit: 'd', color: 'bg-neutral-700' },
              { label: 'THROUGHPUT', value: metrics.tp, unit: '', color: 'bg-neutral-500' },
              { label: 'WIP', value: metrics.wip, unit: '', color: 'bg-neutral-300' }
            ].map((metric, idx) => (
              <div 
                key={metric.label} 
                className={`${metric.color} ${idx < 2 ? 'text-white' : 'text-neutral-900'} p-8 aspect-square flex flex-col justify-between hover:scale-105 transition-transform cursor-pointer`}
              >
                <div className="font-mono text-xs tracking-widest opacity-60">
                  {metric.label}
                </div>
                <div>
                  <div className="text-6xl font-black tabular-nums">
                    {metric.value}
                  </div>
                  <div className="font-mono text-sm opacity-60">{metric.unit}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-32 bg-neutral-50">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-8xl font-black text-neutral-100 leading-none mb-12">05</div>
          <blockquote className="text-4xl md:text-6xl font-light leading-tight mb-12">
            "The goal is not to<br/>
            go faster, but to<br/>
            <span className="font-black">flow smoother.</span>"
          </blockquote>
          <p className="text-xl text-neutral-600 leading-relaxed max-w-2xl">
            Kanban exposes waste. Visualizing work reveals bottlenecks. 
            Limiting WIP creates focus. Measuring flow enables prediction. 
            This isn't project management—it's continuous delivery.
          </p>
        </div>
      </section>

      {/* Final CTA - Dramatic */}
      <section className="relative min-h-screen flex items-center justify-center bg-neutral-900 text-white">
        <div className="text-center px-6">
          <h2 className="text-[15vw] md:text-[12rem] font-black leading-none tracking-tighter mb-12">
            START<br/>FLOWING
          </h2>
          <button className="px-12 py-6 bg-white text-neutral-900 font-mono text-lg tracking-widest hover:bg-neutral-200 transition-all transform hover:scale-110 active:scale-95">
            CREATE BOARD
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-4 border-neutral-900 bg-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-neutral-900" />
              <div className="font-mono text-xs">
                <div className="font-bold tracking-widest">KANOTION</div>
                <div className="text-neutral-400">© 2025</div>
              </div>
            </div>
            <div className="flex gap-8 font-mono text-xs tracking-widest">
              <a href="#" className="hover:text-neutral-600 transition-colors">METHOD</a>
              <a href="#" className="hover:text-neutral-600 transition-colors">DOCS</a>
              <a href="#" className="hover:text-neutral-600 transition-colors">API</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}