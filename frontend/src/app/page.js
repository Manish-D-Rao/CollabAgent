"use client";

import { useState } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Handle,
  Position,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Activity,
  Bot,
  ChevronDown,
  CircleHelp,
  Clock3,
  GitBranch,
  PanelLeftClose,
  Play,
  Plus,
  Settings2,
  ShieldCheck,
  Users,
  Zap,
} from "lucide-react";
import BackendStatus from "@/components/BackendStatus";

const initialNodes = [
  {
    id: "1",
    type: "agentNode",
    position: { x: 60, y: 100 },
    data: {
      title: "Research request",
      subtitle: "Input received",
      status: "completed",
      number: "01",
    },
  },
  {
    id: "2",
    type: "agentNode",
    position: { x: 340, y: 100 },
    data: {
      title: "Plan task",
      subtitle: "Planning",
      status: "running",
      number: "02",
    },
  },
  {
    id: "3",
    type: "agentNode",
    position: { x: 620, y: 100 },
    data: {
      title: "Execute research",
      subtitle: "Waiting",
      status: "waiting",
      number: "03",
    },
  },
  {
    id: "4",
    type: "agentNode",
    position: { x: 900, y: 100 },
    data: {
      title: "Review results",
      subtitle: "Waiting",
      status: "waiting",
      number: "04",
    },
  },
];

const initialEdges = [
  { id: "e1-2", source: "1", target: "2", animated: true },
  { id: "e2-3", source: "2", target: "3" },
  { id: "e3-4", source: "3", target: "4" },
];

function AgentNode({ data }) {
  const statusStyles = {
    completed: "border-emerald-500/40 bg-emerald-500/5",
    running: "border-violet-400 bg-violet-500/10",
    waiting: "border-white/10 bg-[#171923]",
  };

  const dotStyles = {
    completed: "bg-emerald-400",
    running: "bg-violet-400 animate-pulse",
    waiting: "bg-slate-500",
  };

  return (
    <div
      className={`w-55 rounded-xl border p-4 shadow-xl ${
        statusStyles[data.status]
      }`}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="h-2! w-2! border-0! bg-violet-400!"
      />

      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] text-slate-500">
          STEP_{data.number}
        </span>
        <span className={`h-2 w-2 rounded-full ${dotStyles[data.status]}`} />
      </div>

      <p className="text-sm font-semibold text-slate-100">{data.title}</p>
      <p className="mt-1 text-xs text-slate-400">{data.subtitle}</p>

      <Handle
        type="source"
        position={Position.Right}
        className="h-2! w-2! border-0! bg-violet-400!"
      />
    </div>
  );
}

const nodeTypes = { agentNode: AgentNode };

export default function Home() {
  const [isRunning, setIsRunning] = useState(false);

  return (
    <main className="flex h-screen overflow-hidden bg-[#0c0d12] text-slate-200">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-white/[0.07] bg-[#101117] md:flex">
        <div className="flex h-16 items-center gap-3 border-b border-white/[0.07] px-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-600">
            <Bot size={21} />
          </div>
          <div>
            <h1 className="font-semibold tracking-tight">CollabAgent</h1>
            <p className="text-[10px] text-slate-500">MULTIPLAYER AGENT OS</p>
          </div>
        </div>

        <div className="p-4">
          <button className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-white/3 p-3 text-sm">
            <span className="flex items-center gap-2">
              <GitBranch size={15} className="text-violet-400" />
              Research workspace
            </span>
            <ChevronDown size={14} />
          </button>
        </div>

        <div className="px-5 pb-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-500">
          Workspace
        </div>

        <nav className="space-y-1 px-3">
          <button className="flex w-full items-center gap-3 rounded-lg bg-violet-500/10 px-3 py-2.5 text-sm text-violet-300">
            <GitBranch size={16} /> Agent canvas
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5">
            <Activity size={16} /> Activity log
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5">
            <Users size={16} /> Collaborators
          </button>
        </nav>

        <div className="mx-4 mt-6 border-t border-white/[0.07]" />

        <div className="mt-auto space-y-1 p-3">
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5">
            <Settings2 size={16} /> Settings
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-white/5">
            <CircleHelp size={16} /> Help & docs
          </button>
          <div className="mt-3 flex items-center gap-3 rounded-lg border border-white/[0.07] p-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-700 text-xs font-semibold">
              Y
            </div>
            <div>
              <p className="text-xs font-medium">Workspace member</p>
              <p className="text-[10px] text-slate-500">Local prototype</p>
            </div>
          </div>
        </div>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/[0.07] px-4 md:px-7">
          <div className="flex items-center gap-3">
            <PanelLeftClose
              size={17}
              className="hidden text-slate-500 md:block"
            />
            <div>
              <p className="text-sm font-medium">Research workspace</p>
              <p className="mt-0.5 text-[10px] text-slate-500">
                Workspace / Untitled agent run
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 text-xs text-slate-400 sm:flex">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />
              <BackendStatus />
            </div>
            <button className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs hover:bg-white/5">
              <Users size={14} /> Invite
            </button>
            <button
              onClick={() => setIsRunning(!isRunning)}
              className="flex items-center gap-2 rounded-lg bg-violet-600 px-3 py-2 text-xs font-semibold hover:bg-violet-500"
            >
              {isRunning ? <Activity size={14} /> : <Play size={14} />}
              {isRunning ? "Pause demo" : "Run demo"}
            </button>
          </div>
        </header>

        <div className="flex flex-1 flex-col overflow-hidden xl:flex-row">
          <div className="relative min-h-105 flex-1">
            <div className="absolute left-5 top-5 z-10">
              <div className="rounded-lg border border-white/10 bg-[#15161e]/95 px-3 py-2 shadow-lg">
                <p className="text-xs font-medium">Execution graph</p>
                <p className="mt-1 text-[10px] text-slate-500">
                  4 nodes · 3 connections
                </p>
              </div>
            </div>

            <div className="absolute right-5 top-5 z-10 flex items-center gap-2 rounded-lg border border-white/10 bg-[#15161e]/95 px-3 py-2 text-[10px] text-slate-400">
              <span className="h-2 w-2 rounded-full bg-violet-400" />
              Running
            </div>

            <ReactFlow
              nodes={initialNodes}
              edges={initialEdges}
              nodeTypes={nodeTypes}
              fitView
              fitViewOptions={{ padding: 0.2 }}
              minZoom={0.3}
              maxZoom={1.5}
              proOptions={{ hideAttribution: true }}
            >
              <Background color="#30313d" gap={22} size={1} />
              <Controls />
              <MiniMap
                nodeColor={(node) =>
                  node.data.status === "completed"
                    ? "#34d399"
                    : node.data.status === "running"
                      ? "#a78bfa"
                      : "#454654"
                }
                maskColor="rgba(12,13,18,0.7)"
              />
            </ReactFlow>

            <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 rounded-lg border border-white/10 bg-[#15161e]/95 px-3 py-2 text-[10px] text-slate-400">
              <ShieldCheck size={13} className="text-emerald-400" />
              {isRunning
                ? "Demo mode · No agent connected"
                : "Ready · Awaiting execution engine"}
            </div>
          </div>

          <aside className="flex w-full shrink-0 flex-col border-t border-white/[0.07] bg-[#101117] xl:w-80 xl:border-l xl:border-t-0">
            <div className="flex h-14 items-center justify-between border-b border-white/[0.07] px-5">
              <span className="text-sm font-medium">Run inspector</span>
              <Activity size={15} className="text-slate-500" />
            </div>

            <div className="border-b border-white/[0.07] p-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Execution status
              </p>
              <div className="mt-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/10 text-violet-300">
                  <Zap size={19} />
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {isRunning ? "Demo activated" : "Not started"}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {isRunning ? "UI state changed locally" : "Waiting for run"}
                  </p>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-white/[0.07] p-3">
                  <p className="text-[10px] text-slate-500">Nodes</p>
                  <p className="mt-1 text-lg font-semibold">04</p>
                </div>
                <div className="rounded-lg border border-white/[0.07] p-3">
                  <p className="text-[10px] text-slate-500">Elapsed</p>
                  <p className="mt-1 text-lg font-semibold">00:00</p>
                </div>
              </div>
            </div>

            <div className="flex-1 p-5">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                  Recent activity
                </p>
                <Clock3 size={14} className="text-slate-500" />
              </div>

              <div className="mt-5 space-y-5">
                <div className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-emerald-400" />
                  <div>
                    <p className="text-xs font-medium">Input received</p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      Research request initialized
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-violet-400" />
                  <div>
                    <p className="text-xs font-medium">Plan task</p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      Sample execution state
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-slate-600" />
                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Awaiting backend
                    </p>
                    <p className="mt-1 text-[10px] text-slate-500">
                      Live events will be connected later
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/[0.07] p-4">
              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 py-2.5 text-xs text-slate-400 hover:bg-white/5">
                <Plus size={14} /> Add workflow node
              </button>
              <p className="mt-3 text-center text-[10px] text-slate-600">
                CollabAgent · Local prototype
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}
