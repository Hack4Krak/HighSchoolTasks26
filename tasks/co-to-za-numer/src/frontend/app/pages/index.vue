<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const day = computed(() => Number(route.query.day) || 1)
const nextDay = computed(() => day.value + 1)
const prevDay = computed(() => Math.max(1, day.value - 1))

const config = useRuntimeConfig()
const API = config.public.apiBase

const revealIdx = ref(0)
const attempts = ref<Attempt[]>([])
const input = ref('')
const won = ref(false)
const playing = ref(false)
const elapsed = ref(0)
const guessing = ref(false)
const showDrop = ref(false)
const activeSuggestionIndex = ref(-1)

type AttemptStatus = 'correct' | 'wrong'
interface Attempt { text: string; status: AttemptStatus; timestamp: string }

const REVEAL_DURATION = 16

const { data: dayData, error: dayError, refresh: refreshDay } = await useFetch<{ day: number; preview: string }>(
  () => `${API}/api/day/${day.value}`
)
const { data: allSongs } = await useFetch<string[]>(`${API}/api/search`)

if (dayError.value) throw createError({ statusCode: 404, message: 'Nie znaleziono piosenki' })

watch(() => route.query.day, () => {
  won.value = false
  attempts.value = []
  revealIdx.value = 0
  input.value = ''
  stopPlayback()
  initAudio()
  useSeoMeta({ title: `SYS_DECRYPT: PIOSENKA ${day.value}` })
})

const suggestions = computed(() => {
  const q = input.value.trim().toLowerCase()
  if (!q || !allSongs.value) return []
  return allSongs.value.filter(t => t.toLowerCase().includes(q)).slice(0, 8)
})

watch(suggestions, () => { activeSuggestionIndex.value = -1 })

let audio: HTMLAudioElement | null = null
let ticker: any = null

const initAudio = () => {
  if (audio) {
    audio.pause()
    audio.removeEventListener('ended', stopPlayback)
  }
  if (dayData.value?.preview) {
    audio = new Audio(`${API}${dayData.value.preview}`)
    audio.addEventListener('ended', stopPlayback)
  }
}

onMounted(initAudio)
onUnmounted(stopPlayback)

function startPlayback() {
  if (!audio || playing.value) return
  audio.currentTime = 0
  audio.play().catch(() => {})
  playing.value = true
  elapsed.value = 0
  ticker = setInterval(() => {
    elapsed.value = Math.min(1, elapsed.value + 50 / (REVEAL_DURATION * 1000))
    if (elapsed.value >= 1) stopPlayback()
  }, 50)
}

function stopPlayback() {
  audio?.pause()
  playing.value = false
  elapsed.value = 0
  if (ticker) { clearInterval(ticker); ticker = null }
}

async function submitGuess(title?: string) {
  const finalGuess = (title || (activeSuggestionIndex.value !== -1 ? suggestions.value[activeSuggestionIndex.value] : input.value)).trim()
  if (!finalGuess || won.value || guessing.value) return

  guessing.value = true
  showDrop.value = false
  input.value = ''
  stopPlayback()

  try {
    const res = await $fetch<{ correct: boolean }>(`${API}/api/guess`, {
      method: 'POST',
      body: { day: day.value, guess: finalGuess },
    })

    const timestamp = new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })
    attempts.value.unshift({ text: finalGuess, status: res.correct ? 'correct' : 'wrong', timestamp })

    if (res.correct) won.value = true
  } finally {
    guessing.value = false
  }
}

function onKeyDown(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeSuggestionIndex.value = Math.min(activeSuggestionIndex.value + 1, suggestions.value.length - 1)
    showDrop.value = true
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeSuggestionIndex.value = Math.max(activeSuggestionIndex.value - 1, 0)
  } else if (e.key === 'Escape') {
    showDrop.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#020502] text-[#33ff33] font-mono relative selection:bg-[#33ff33] selection:text-[#020502] flex flex-col">

    <div class="absolute inset-0 z-0 opacity-10 pointer-events-none"
         style="background-image: linear-gradient(#33ff331a 1px, transparent 1px), linear-gradient(90deg, #33ff331a 1px, transparent 1px); background-size: 30px 30px;"></div>
    <div class="pointer-events-none fixed inset-0 z-50 bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.05)_2px,rgba(0,0,0,0.05)_4px)]" />
    <div class="pointer-events-none fixed inset-0 z-40 bg-[radial-gradient(circle,transparent_60%,rgba(0,0,0,0.8)_100%)] animate-flicker" />

    <main class="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8 flex-1 flex flex-col min-h-0">

      <nav class="flex items-center justify-between mb-6 border-b border-[#33ff3333] pb-4">
        <div class="flex items-center gap-4">
          <NuxtLink to="/" class="text-[10px] opacity-40 hover:opacity-100 transition-all">ŹRÓDŁO</NuxtLink>
          <div class="h-3 w-[1px] bg-[#33ff3333]"></div>
          <div class="flex items-center gap-2">
            <NuxtLink :to="`/?day=${prevDay}`" class="hover:text-white">&lt;</NuxtLink>
            <span class="text-xs font-bold glow-text">PIOSENKA_{{ day }}</span>
            <NuxtLink :to="`/?day=${nextDay}`" class="hover:text-white">&gt;</NuxtLink>
          </div>
        </div>
        <div class="text-right text-[9px] opacity-30 tracking-[0.2em] hidden xs:block uppercase">
          Nasłuch v4 // Aktywny
        </div>
      </nav>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 min-h-0">

        <div class="lg:col-span-7 flex flex-col gap-6">

          <div class="border border-[#33ff3325] bg-[#33ff3303] p-4 sm:p-6 relative">
            <div class="flex justify-between items-center mb-4 text-[10px] opacity-40 tracking-widest">
              <span>[STRUMIEŃ]</span>
            </div>

            <div class="flex items-end gap-[2px] sm:gap-[4px] h-20 mb-6">
              <div v-for="i in 40" :key="i"
                   class="flex-1 bg-[#33ff33] rounded-t-sm transition-all duration-75"
                   :style="{
                     height: playing ? `${20 + Math.random() * 80}%` : '10%',
                     opacity: (i/40) <= (elapsed || 0) ? 1 : 0.1,
                     boxShadow: (i/40) <= (elapsed || 0) && playing ? '0 0 10px #33ff33' : 'none'
                  }"
              />
            </div>

            <div class="flex flex-wrap items-center gap-4">
              <button @click="playing ? stopPlayback() : startPlayback()" :disabled="won"
                      class="flex-1 sm:flex-none px-6 py-3 bg-[#33ff33] text-[#020502] font-black text-xs hover:bg-[#55ff55] disabled:opacity-20 transition-all">
                {{ playing ? 'STÓJ' : 'PUŚĆ' }}
              </button>
            </div>
          </div>

          <div class="relative" :class="{ 'opacity-20 pointer-events-none': won }">
            <div class="flex items-center gap-3 border border-[#33ff3344] focus-within:border-[#33ff33] p-4 bg-[#050805] transition-all">
              <span class="text-[#33ff3388] text-xs font-bold hidden sm:inline">REKOM:</span>
              <input
                v-model="input"
                @input="showDrop = true"
                @keydown.enter="submitGuess()"
                @keydown="onKeyDown"
                placeholder="JAK SIĘ ZOWIE..."
                class="bg-transparent border-none outline-none flex-1 text-[#33ff33] placeholder:text-[#33ff3311] text-sm uppercase tracking-widest"
                autocomplete="off"
              />
            </div>

            <ul v-if="showDrop && suggestions.length"
                class="absolute bottom-full left-0 right-0 mb-1 border border-[#33ff33] bg-[#020502] z-50 max-h-40 overflow-y-auto shadow-2xl">
              <li v-for="(s, i) in suggestions" :key="s"
                  @mousedown="submitGuess(s)"
                  @mouseenter="activeSuggestionIndex = i"
                  class="px-4 py-3 text-[11px] cursor-pointer border-b border-[#33ff3311] transition-all uppercase"
                  :class="i === activeSuggestionIndex ? 'bg-[#33ff33] text-[#020502] font-bold' : 'text-[#33ff33] hover:bg-[#33ff330a]'"
              >
                {{ s }}
              </li>
            </ul>
          </div>

          <div v-if="won" class="border-2 border-[#33ff33] p-6 sm:p-8 bg-[#33ff330a] text-center animate-in zoom-in-95 duration-300">
            <h2 class="text-3xl sm:text-4xl font-black mb-2 glow-text tracking-widest italic">ODNALAZŁO SIĘ</h2>
            <p class="text-[10px] opacity-60 mb-8 uppercase tracking-[0.2em]">Naleźli my piosenke.</p>

            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <NuxtLink :to="`/?day=${nextDay}`" class="bg-[#33ff33] text-[#020502] px-8 py-3 text-xs font-black hover:bg-[#55ff55] transition-all uppercase tracking-widest">
                Następno piosenka >>
              </NuxtLink>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 flex flex-col h-[250px] lg:h-full min-h-0">
          <div class="border border-[#33ff3325] bg-[#05080555] flex-1 flex flex-col overflow-hidden">
            <div class="p-2 border-b border-[#33ff3325] text-[9px] uppercase tracking-widest opacity-40 bg-[#33ff3305] flex justify-between">
              <span>Historyja próbowaniô.log</span>
              <span class="animate-pulse">NAGR_</span>
            </div>
            <div class="p-4 overflow-y-auto space-y-3 flex-1 scrollbar-terminal flex flex-col">
              <div v-for="(a, i) in attempts" :key="i"
                   class="border-l-2 pl-3 py-1 transition-opacity"
                   :class="a.status === 'correct' ? 'border-[#33ff33] bg-[#33ff330a]' : 'border-[#33ff3333] opacity-60'">
                <div class="flex justify-between text-[8px] mb-1 opacity-40 tabular-nums">
                  <span>LOG_{{ attempts.length - i }}</span>
                  <span>{{ a.timestamp }}</span>
                </div>
                <div class="text-[10px] uppercase tracking-wider break-words">
                  <span v-if="a.status === 'correct'" class="font-black mr-2 text-[#33ff33]">[OK]</span>
                  <span v-else class="mr-2 opacity-40">[!!]</span>
                  {{ a.text }}
                </div>
              </div>
              <div v-if="!attempts.length" class="text-[10px] opacity-20 italic">Cekomy na telimetrijo...</div>
            </div>
          </div>
        </div>

      </div>
    </main>
  </div>
</template>

<style scoped>
@keyframes flicker {
  0% { opacity: 0.99; }
  10% { opacity: 0.92; }
  20% { opacity: 0.98; }
  50% { opacity: 0.95; }
  80% { opacity: 0.99; }
  100% { opacity: 0.96; }
}

.animate-flicker {
  animation: flicker 0.15s infinite;
}

.glow-text {
  text-shadow: 0 0 10px rgba(51, 255, 51, 0.6), 0 0 20px rgba(51, 255, 51, 0.2);
}

.scrollbar-terminal::-webkit-scrollbar {
  width: 4px;
}
.scrollbar-terminal::-webkit-scrollbar-track {
  background: rgba(51, 255, 51, 0.05);
}
.scrollbar-terminal::-webkit-scrollbar-thumb {
  background: rgba(51, 255, 51, 0.15);
}

input::placeholder {
  color: rgba(51, 255, 51, 0.1);
}

@media (max-width: 400px) {
  .glow-text {
    font-size: 1.25rem;
  }
}
</style>
