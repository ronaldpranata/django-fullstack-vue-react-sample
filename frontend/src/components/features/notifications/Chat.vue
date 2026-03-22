<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';
import Button from '../../common/Button.vue';

const socket = ref(null);
const status = ref('Disconnected');
const messages = ref([]);
const newMessage = ref('');
const messagesEndRef = ref(null);

const connectWs = () => {
  status.value = 'Connecting...';
  const token = localStorage.getItem('access_token');
  if (!token) {
    status.value = 'Unauthenticated';
    return;
  }
  socket.value = new WebSocket(`ws://127.0.0.1:8000/ws/notifications/?token=${token}`);

  socket.value.onopen = () => { status.value = 'Connected 🟢'; };
  socket.value.onmessage = async (event) => {
    const data = JSON.parse(event.data);
    if (data.type === 'history') {
      messages.value = data.messages;
    } else if (data.type === 'message') {
      messages.value.push(data);
    }
    await nextTick();
    if (messagesEndRef.value) messagesEndRef.value.scrollIntoView({ behavior: 'smooth' });
  };
  socket.value.onclose = () => { status.value = 'Disconnected 🔴'; };
  socket.value.onerror = () => { status.value = 'Error 🔴'; };
};

const sendMessage = () => {
  if (socket.value && socket.value.readyState === WebSocket.OPEN && newMessage.value.trim() !== '') {
    socket.value.send(JSON.stringify({ message: newMessage.value }));
    newMessage.value = '';
  }
};

onMounted(connectWs);
onUnmounted(() => { if (socket.value) socket.value.close(); });
</script>

<template>
  <div class="bg-surface rounded-xl p-6 mt-12 shadow-xl border border-gray-800 relative overflow-hidden group">
    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-[#bb86fc]"></div>
    
    <div class="flex justify-between items-center mb-4 border-b border-gray-700/50 pb-3">
      <h2 class="text-[#bb86fc] text-lg font-bold flex items-center gap-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"></path></svg>
        Live Intercom
      </h2>
      <span class="text-gray-400 text-xs uppercase tracking-wider px-3 bg-gray-800 rounded-full py-1 font-semibold">{{ status }}</span>
    </div>
    
    <div class="h-64 overflow-y-auto bg-background rounded-lg p-4 mb-4 space-y-4 shadow-inner">
      <div v-for="(msg, i) in messages" :key="i" class="p-3.5 rounded-xl text-sm w-fit max-w-[85%] leading-relaxed bg-gray-800 text-gray-200 shadow-md">
        <div class="flex items-center gap-2 mb-1">
          <span class="font-bold text-[#bb86fc] text-xs uppercase tracking-wide">{{ msg.author || 'System' }}</span>
          <span class="text-xs text-gray-500 font-mono">{{ msg.timestamp }}</span>
        </div>
        <p class="text-[15px] opacity-90">{{ msg.message }}</p>
      </div>
      <div v-if="messages.length === 0" class="text-center text-gray-600 italic mt-12 text-sm">No historical messages found...</div>
      <div ref="messagesEndRef"></div>
    </div>

    <form @submit.prevent="sendMessage" class="flex gap-3 relative">
      <input
        v-model="newMessage"
        :disabled="status !== 'Connected 🟢'"
        placeholder="Secure Broadcast..."
        class="flex-1 bg-gray-800 border border-gray-700 p-3.5 rounded-lg text-white focus:ring-2 focus:ring-[#bb86fc]/50 focus:border-[#bb86fc] outline-none disabled:opacity-50 transition-all font-medium"
      />
      <Button type="submit" :disabled="status !== 'Connected 🟢'" class="bg-[#bb86fc] text-black hover:bg-purple-400 px-6 font-bold shadow-lg shadow-purple-900/40">
        Transmit
      </Button>
    </form>
  </div>
</template>
