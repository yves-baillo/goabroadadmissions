<template>
  <div class="min-h-screen bg-[#02120a] text-white antialiased overflow-x-hidden relative">
    <!-- ═══════════════ VIDEO BACKGROUND ═══════════════ -->
    <video
      class="fixed inset-0 w-full h-full object-cover -z-10"
      autoplay
      muted
      loop
      playsinline
      preload="auto"
      poster="https://i.postimg.cc/rm0MyKch/img10.avif"
    >
      <source src="https://cdn.pixabay.com/video/2026/04/03/344380_small.mp4" type="video/mp4" />
      <source src="https://cdn.pixabay.com/video/2026/04/08/345377_tiny.mp4" type="video/mp4" />
    </video>

    <!-- Dark green overlay so content stays readable -->
    <div class="fixed inset-0 -z-10 bg-gradient-to-br from-[#02120a]/90 via-[#02120a]/80 to-[#02120a]/95" />

    <!-- Ambient background (glows + grid on top of video) -->
    <div class="pointer-events-none fixed inset-0 overflow-hidden -z-[5]">
      <div class="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-emerald-500/25 blur-[130px] animate-float" />
      <div class="absolute top-1/3 -right-40 w-[520px] h-[520px] rounded-full bg-lime-500/15 blur-[130px] animate-float-delayed" />
      <div class="absolute bottom-0 left-1/3 w-[420px] h-[420px] rounded-full bg-teal-500/15 blur-[130px] animate-float-slow" />
      <div class="absolute inset-0 opacity-[0.015] [background-image:radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:32px_32px]" />
    </div>

    <main class="relative mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <!-- ═══════════════ TOP BAR ═══════════════ -->
      <div class="relative z-40 mb-7 flex items-center justify-between gap-2 animate-slide-down">
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
            <Sparkles class="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 class="text-base font-bold bg-gradient-to-r from-white to-emerald-200 bg-clip-text text-transparent">Admin Dashboard</h1>
            <p class="text-[10px] text-emerald-400 tracking-wide">goabroadadmissions.com</p>
          </div>
        </div>

        <div class="flex items-center gap-2">
          <span class="hidden items-center gap-1.5 rounded-xl border border-white/10 bg-black/30 px-3 py-2 text-xs text-emerald-200 sm:inline-flex backdrop-blur-xl transition-all hover:border-white/20">
            <span class="h-1.5 w-1.5 rounded-full" :class="cloudAvailable ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.9)] animate-pulse-dot' : 'bg-amber-400'" />
            {{ cloudAvailable ? 'Cloud connected' : 'Local mode' }}
          </span>

          <div class="relative">
            <button
              @click="showNotifications = !showNotifications"
              class="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-emerald-200 transition hover:-translate-y-0.5 hover:bg-white/10 hover:border-white/20"
            >
              <Bell class="h-5 w-5" />
              <span
                v-if="notificationItems.length"
                class="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-gradient-to-r from-emerald-500 to-lime-400 px-1 text-[10px] font-bold text-white shadow-lg shadow-emerald-500/40 animate-pulse"
              >{{ notificationItems.length > 9 ? '9+' : notificationItems.length }}</span>
            </button>

            <Transition name="notification-pop">
              <div
                v-if="showNotifications"
                class="absolute right-0 top-12 z-50 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-white/15 bg-[#0a1f14]/95 shadow-2xl shadow-black/50 backdrop-blur-2xl"
              >
                <div class="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-emerald-500/10 to-lime-500/5 px-4 py-3">
                  <div>
                    <h3 class="text-sm font-semibold text-white">Notifications</h3>
                    <p class="text-[11px] text-emerald-300">Messages & scholarships</p>
                  </div>
                  <span class="text-xs font-medium text-lime-300">{{ notificationItems.length }} new</span>
                </div>

                <div v-if="notificationItems.length" class="max-h-80 overflow-y-auto p-2">
                  <button
                    v-for="item in notificationItems"
                    :key="item.id"
                    @click="openNotification(item)"
                    class="flex w-full items-start gap-3 rounded-xl p-3 text-left transition hover:bg-white/[0.07]"
                  >
                    <img v-if="item.image" :src="item.image" alt="" class="h-10 w-10 shrink-0 rounded-lg object-cover ring-1 ring-white/10" />
                    <div v-else class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg" :class="item.type === 'message' ? 'bg-emerald-500/15 text-emerald-300' : 'bg-lime-500/15 text-lime-300'">
                      <MessageSquare v-if="item.type === 'message'" class="h-4 w-4" />
                      <GraduationCap v-else class="h-4 w-4" />
                    </div>
                    <div class="min-w-0 flex-1">
                      <p class="truncate text-xs font-semibold text-white">{{ item.title }}</p>
                      <p class="mt-1 line-clamp-2 text-[11px] text-emerald-300">{{ item.description }}</p>
                      <span class="mt-1 block text-[10px] text-emerald-400">
                        {{ item.type === 'message' ? 'Frontend message' : 'Scholarship posted' }}
                      </span>
                    </div>
                  </button>
                </div>
                <div v-else class="px-4 py-10 text-center text-xs text-emerald-300">No new notifications</div>
              </div>
            </Transition>
          </div>

          <button @click="refreshAll" :disabled="refreshing" class="btn-ghost">
            <Loader2 v-if="refreshing" class="h-4 w-4 animate-spin" />
            <RefreshCw v-else class="h-4 w-4 transition-transform group-hover:rotate-180" />
            {{ refreshing ? 'Refreshing…' : 'Refresh' }}
          </button>

          <button @click="logout" class="btn-danger">
            <LogOut class="h-4 w-4" /> Logout
          </button>
        </div>
      </div>

      <!-- ═══════════════ OFFLINE BANNER ═══════════════ -->
      <Transition name="fade">
        <div
          v-if="!cloudAvailable"
          class="mb-6 flex items-center gap-3 px-4 py-3 rounded-xl bg-gradient-to-r from-amber-500/15 to-lime-500/10 border border-amber-500/30 text-amber-200 text-sm animate-slide-down backdrop-blur-xl"
        >
          <AlertCircle class="w-4 h-4 shrink-0" />
          <span>Running in local mode — cloud sync unavailable.</span>
        </div>
      </Transition>

      <!-- ═══════════════ STAT CARDS ═══════════════ -->
      <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
        <div
          v-for="(stat, idx) in statCards"
          :key="stat.key"
          class="stat-card group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.09] via-white/[0.045] to-white/[0.015] p-5 shadow-xl shadow-black/20 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-white/25 hover:shadow-2xl hover:shadow-black/30 cursor-default"
          :style="{ animationDelay: `${idx * 100}ms` }"
        >
          <div class="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-70 group-hover:opacity-100 transition-opacity" :class="stat.accent" />

          <div class="absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500" :class="stat.glow" />

          <div class="relative flex items-start justify-between mb-4">
            <div class="p-2.5 rounded-xl border transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 bg-gradient-to-br" :class="stat.iconBg">
              <component :is="stat.icon" class="w-5 h-5" :class="stat.iconColor" />
            </div>
            <component
              :is="stat.trend >= 0 ? ArrowUpRight : ArrowDownRight"
              class="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              :class="stat.trend >= 0 ? 'text-emerald-400' : 'text-teal-400'"
            />
          </div>

          <div class="relative">
            <div class="text-3xl font-bold tabular-nums bg-gradient-to-br from-white to-emerald-200 bg-clip-text text-transparent">
              {{ animatedStats[stat.key] ?? 0 }}
            </div>
            <div class="mt-1 text-sm font-medium text-emerald-100">{{ stat.label }}</div>
            <div class="mt-0.5 text-xs text-emerald-400">{{ stat.sub }}</div>
          </div>
        </div>
      </div>

      <!-- ═══════════════ SETTINGS ACCORDION ═══════════════ -->
      <div class="mb-8 animate-slide-up" style="animation-delay: 300ms">
        <div class="bg-gradient-to-br from-white/[0.06] to-white/[0.02] backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-colors">
          <button
            class="w-full p-5 flex items-center gap-3 hover:bg-white/[0.05] transition group"
            @click="showSettings = !showSettings"
          >
            <div class="p-2 rounded-lg bg-gradient-to-br from-emerald-500/20 to-lime-500/10 border border-emerald-500/30 group-hover:scale-110 transition-transform">
              <Key class="w-4 h-4 text-emerald-400" />
            </div>
            <h2 class="text-base font-semibold text-white text-left flex-1">Account Settings</h2>
            <ChevronDown class="w-5 h-5 text-emerald-300 transition-transform duration-300" :class="{ 'rotate-180': showSettings }" />
          </button>

          <Transition name="accordion">
            <div v-show="showSettings" class="border-t border-white/10 p-5 space-y-6">
              <form @submit.prevent="changeAdminPassword" class="grid grid-cols-1 md:grid-cols-3 gap-3">
                <input type="password" v-model="passwordForm.currentPassword" placeholder="Current password" class="input-base" />
                <input type="password" v-model="passwordForm.newPassword" placeholder="New password" class="input-base" />
                <input type="password" v-model="passwordForm.confirmPassword" placeholder="Confirm new password" class="input-base" />
                <button type="submit" class="md:col-span-3 btn-primary">Update Password</button>
              </form>
              <p v-if="passwordMessage" class="text-sm" :class="passwordMessageType === 'success' ? 'text-emerald-400' : 'text-rose-400'">
                {{ passwordMessage }}
              </p>

              <form @submit.prevent="changeAdminUsername" class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input type="text" disabled :value="adminUsername" class="input-base opacity-60" />
                <input type="text" v-model="usernameForm.newUsername" placeholder="New username" class="input-base" />
                <input type="password" v-model="usernameForm.currentPassword" placeholder="Current password" class="input-base" />
                <button type="submit" class="btn-primary">Update Username</button>
              </form>
              <p v-if="usernameMessage" class="text-sm" :class="usernameMessageType === 'success' ? 'text-emerald-400' : 'text-rose-400'">
                {{ usernameMessage }}
              </p>
            </div>
          </Transition>
        </div>
      </div>

      <!-- ═══════════════ TABS ═══════════════ -->
      <div class="mb-6 overflow-x-auto rounded-2xl border border-white/10 bg-white/[0.035] p-1.5 shadow-xl shadow-black/10 backdrop-blur-xl no-scrollbar">
        <div class="flex min-w-max gap-1">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="relative flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-300 group"
            :class="activeTab === tab.id ? 'text-lime-300 bg-gradient-to-r from-emerald-500/[0.18] to-lime-500/[0.08]' : 'text-emerald-200/70 hover:text-white hover:bg-white/[0.04]'"
          >
            <component :is="tab.icon" class="w-4 h-4 group-hover:scale-110 transition-transform" />
            {{ tab.name }}
            <span
              class="px-2 py-0.5 text-[10px] rounded-full tabular-nums transition-all"
              :class="activeTab === tab.id ? 'bg-gradient-to-r from-emerald-500/30 to-lime-500/20 text-lime-100' : 'bg-white/10 text-white/70'"
            >{{ tab.count }}</span>
            <span
              class="absolute bottom-0 left-3 right-3 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-500 to-lime-400 rounded-full transition-all duration-300 origin-center shadow-[0_0_12px_rgba(16,185,129,0.65)]"
              :class="activeTab === tab.id ? 'scale-x-100 opacity-100' : 'scale-x-0 opacity-0'"
            />
          </button>
        </div>
      </div>

      <!-- ═══════════════ CONTENT ═══════════════ -->
      <Transition name="fade" mode="out-in">
        <div v-if="loading" key="loading" class="space-y-4">
          <div v-for="i in 4" :key="i" class="skeleton h-14 rounded-xl" :style="{ animationDelay: `${i * 100}ms` }" />
        </div>

        <div v-else :key="activeTab" class="space-y-6">
          <!-- Messages -->
          <section v-if="activeTab === 'messages'" class="animate-slide-up">
            <DataPanel
              title="Frontend Messages"
              :subtitle="cloudAvailable ? 'Messages from your contact form (JSONBin)' : 'Stored locally until JSONBin is fixed'"
              :count="filteredContacts.length"
              v-model:search="search.contacts"
            >
              <template #actions>
                <button
                  @click="exportCSV(filteredContacts, 'messages')"
                  :disabled="!filteredContacts.length"
                  class="btn-ghost"
                  :class="{ 'opacity-40 cursor-not-allowed': !filteredContacts.length }"
                >
                  <Download class="w-4 h-4" /> Export
                </button>
              </template>
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b border-white/10 bg-gradient-to-r from-emerald-500/[0.06] to-transparent">
                      <th class="th">Name</th>
                      <th class="th">Email</th>
                      <th class="th">Phone</th>
                      <th class="th">Subject</th>
                      <th class="th">Date</th>
                      <th class="th text-right">Actions</th>
                    </tr>
                  </thead>
                  <TransitionGroup tag="tbody" name="row" class="divide-y divide-white/5">
                    <tr v-for="msg in filteredContacts" :key="msg.id" class="tr">
                      <td class="td">
                        <div class="flex items-center gap-2">
                          <div class="w-7 h-7 rounded-full bg-gradient-to-br from-emerald-500/50 to-lime-400/40 flex items-center justify-center text-xs font-bold ring-1 ring-emerald-400/20 transition-transform group-hover:scale-110">
                            {{ initial(msg) }}
                          </div>
                          <span class="text-white font-medium">{{ displayName(msg) }}</span>
                        </div>
                      </td>
                      <td class="td text-emerald-300">{{ msg.email || 'N/A' }}</td>
                      <td class="td text-emerald-300">{{ msg.phone || msg.phone_number || msg.mobile || '-' }}</td>
                      <td class="td"><span class="pill pill-emerald">{{ msg.subject || 'General' }}</span></td>
                      <td class="td text-emerald-300">{{ formatDate(msg.created_at) }}</td>
                      <td class="td">
                        <div class="flex gap-1 justify-end">
                          <button @click="viewMessage(msg)" class="icon-btn icon-btn-info" title="Read"><Eye class="w-4 h-4" /></button>
                          <button @click="deleteContact(msg.id)" class="icon-btn icon-btn-danger" title="Delete"><Trash2 class="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  </TransitionGroup>
                </table>
                <EmptyState
                  v-if="!filteredContacts.length"
                  :icon="MessageSquare"
                  title="No messages yet"
                  subtitle="Messages from the contact form will appear here."
                />
              </div>
            </DataPanel>
          </section>

          <!-- Inquiries -->
          <section v-else-if="activeTab === 'inquiries'" class="animate-slide-up">
            <DataPanel
              title="Scholarship Inquiries"
              subtitle="Student scholarship assistance requests"
              :count="filteredInquiries.length"
              v-model:search="search.inquiries"
            >
              <template #actions>
                <button
                  @click="exportCSV(filteredInquiries, 'inquiries')"
                  :disabled="!filteredInquiries.length"
                  class="btn-ghost"
                  :class="{ 'opacity-40 cursor-not-allowed': !filteredInquiries.length }"
                >
                  <Download class="w-4 h-4" /> Export
                </button>
              </template>
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b border-white/10 bg-gradient-to-r from-emerald-500/[0.06] to-transparent">
                      <th class="th">Name</th>
                      <th class="th">Email</th>
                      <th class="th">Scholarship</th>
                      <th class="th">Status</th>
                      <th class="th">Date</th>
                      <th class="th text-right">Actions</th>
                    </tr>
                  </thead>
                  <TransitionGroup tag="tbody" name="row" class="divide-y divide-white/5">
                    <tr v-for="inq in filteredInquiries" :key="inq.id" class="tr">
                      <td class="td">
                        <div class="flex items-center gap-2">
                          <div class="w-7 h-7 rounded-full bg-gradient-to-br from-lime-500/50 to-emerald-500/40 flex items-center justify-center text-xs font-bold ring-1 ring-lime-400/20">
                            {{ initial(inq) }}
                          </div>
                          <span class="text-white font-medium">{{ displayName(inq) }}</span>
                        </div>
                      </td>
                      <td class="td text-emerald-300">{{ inq.email || 'N/A' }}</td>
                      <td class="td text-white max-w-xs truncate">{{ inq.scholarship_title || 'N/A' }}</td>
                      <td class="td">
                        <select
                          :value="inq.status"
                          @change="updateInquiryStatus(inq.id, $event.target.value)"
                          class="select-mini"
                          :class="inq.status === 'pending' ? 'select-yellow' : 'select-green'"
                        >
                          <option value="pending">Pending</option>
                          <option value="completed">Completed</option>
                        </select>
                      </td>
                      <td class="td text-emerald-300">{{ formatDate(inq.created_at) }}</td>
                      <td class="td">
                        <div class="flex gap-1 justify-end">
                          <button @click="viewInquiry(inq)" class="icon-btn icon-btn-info"><Eye class="w-4 h-4" /></button>
                          <button @click="deleteInquiry(inq.id)" class="icon-btn icon-btn-danger"><Trash2 class="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  </TransitionGroup>
                </table>
                <EmptyState
                  v-if="!filteredInquiries.length"
                  :icon="GraduationCap"
                  title="No scholarship inquiries"
                  subtitle="Inquiries will appear here when students apply."
                />
              </div>
            </DataPanel>
          </section>

          <!-- Scholarships -->
          <section v-else-if="activeTab === 'scholarships'" class="animate-slide-up">
            <DataPanel
              title="Scholarships Management"
              subtitle="Create, edit, and manage scholarship opportunities"
              :count="filteredScholarships.length"
              v-model:search="search.scholarships"
            >
              <template #actions>
                <button @click="openScholarshipModal" class="btn-primary !py-2 !text-xs">
                  <Plus class="w-3.5 h-3.5" /> Add
                </button>
                <button
                  @click="exportCSV(filteredScholarships, 'scholarships')"
                  :disabled="!filteredScholarships.length"
                  class="btn-ghost"
                  :class="{ 'opacity-40 cursor-not-allowed': !filteredScholarships.length }"
                >
                  <Download class="w-4 h-4" /> Export
                </button>
              </template>
              <div class="overflow-x-auto">
                <table class="w-full">
                  <thead>
                    <tr class="border-b border-white/10 bg-gradient-to-r from-emerald-500/[0.06] to-transparent">
                      <th class="th">Title</th>
                      <th class="th">Country</th>
                      <th class="th">Deadline</th>
                      <th class="th">Status</th>
                      <th class="th">Featured</th>
                      <th class="th text-right">Actions</th>
                    </tr>
                  </thead>
                  <TransitionGroup tag="tbody" name="row" class="divide-y divide-white/5">
                    <tr v-for="sch in filteredScholarships" :key="sch.id" class="tr">
                      <td class="td">
                        <div>
                          <span class="text-white font-medium">{{ sch.title }}</span>
                          <p class="text-xs text-emerald-400 mt-0.5 line-clamp-1">
                            {{ (sch.description || '').substring(0, 60) }}…
                          </p>
                        </div>
                      </td>
                      <td class="td text-emerald-300">{{ sch.country || '-' }}</td>
                      <td class="td text-emerald-300">{{ formatDate(sch.deadline) }}</td>
                      <td class="td">
                        <select
                          :value="sch.status"
                          @change="updateScholarshipStatus(sch.id, $event.target.value)"
                          class="select-mini"
                          :class="sch.status === 'active' ? 'select-green' : 'select-red'"
                        >
                          <option value="active">Active</option>
                          <option value="inactive">Inactive</option>
                        </select>
                      </td>
                      <td class="td">
                        <button @click="toggleFeatured(sch.id, sch.featured)" class="transition-transform hover:scale-125">
                          <Star :class="sch.featured ? 'fill-lime-400 text-lime-400' : 'text-white/30'" class="w-5 h-5" />
                        </button>
                      </td>
                      <td class="td">
                        <div class="flex gap-1 justify-end">
                          <button @click="editScholarship(sch)" class="icon-btn icon-btn-info"><Edit class="w-4 h-4" /></button>
                          <button @click="deleteScholarship(sch.id)" class="icon-btn icon-btn-danger"><Trash2 class="w-4 h-4" /></button>
                        </div>
                      </td>
                    </tr>
                  </TransitionGroup>
                </table>
                <EmptyState
                  v-if="!filteredScholarships.length"
                  :icon="BookOpen"
                  title="No scholarships yet"
                  subtitle='Click "Add" to create your first opportunity.'
                />
              </div>
            </DataPanel>
          </section>
        </div>
      </Transition>
    </main>

    <!-- ═══════════════ MESSAGE MODAL ═══════════════ -->
    <Transition name="modal">
      <div v-if="messageModalVisible" class="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4" @click.self="closeMessageModal">
        <div class="modal-card max-w-2xl">
          <div class="modal-header">
            <h3 class="modal-title">Message Details</h3>
            <button @click="closeMessageModal" class="icon-btn"><X class="w-5 h-5" /></button>
          </div>
          <div class="space-y-3 max-h-[60vh] overflow-y-auto pr-1">
            <Field label="Full Name" :icon="User" :value="displayName(selectedMessage)" />
            <Field label="Email" :icon="Mail" :value="selectedMessage?.email || 'N/A'" />
            <Field
              label="Phone"
              :icon="Phone"
              :value="selectedMessage?.phone || selectedMessage?.phone_number || selectedMessage?.mobile || 'Not provided'"
            />
            <Field label="Subject" :value="selectedMessage?.subject || selectedMessage?.scholarship_title || 'General Inquiry'" />
            <Field label="Message" :value="selectedMessage?.message || 'No message content'" />
            <Field label="Date Received" :icon="Calendar" :value="formatDate(selectedMessage?.created_at, true)" />
          </div>

          <div v-if="selectedMessage?.email" class="mt-5 border-t border-white/10 pt-5">
            <label class="lbl" for="replyMessage">Reply to {{ selectedMessage.email }}</label>
            <textarea id="replyMessage" v-model="replyMessage" rows="4" class="input-base resize-none" placeholder="Write your reply..." :disabled="replySending" />
            <p v-if="replyStatus" class="mt-2 text-sm" :class="replyStatusType === 'success' ? 'text-emerald-300' : 'text-rose-300'">{{ replyStatus }}</p>
          </div>

          <div class="mt-6 flex justify-end gap-2 flex-wrap">
            <button
              v-if="selectedMessage?.email"
              @click="sendReply"
              :disabled="replySending || !replyMessage.trim()"
              class="btn-ghost !text-emerald-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Loader2 v-if="replySending" class="w-4 h-4 animate-spin" />
              <Mail v-else class="w-4 h-4" />
              {{ replySending ? 'Sending...' : 'Send Reply' }}
            </button>
            <button v-if="selectedMessage?.phone || selectedMessage?.phone_number || selectedMessage?.mobile" @click="callPhone" class="btn-ghost !text-emerald-300">
              <Phone class="w-4 h-4" /> Call
            </button>
            <button @click="closeMessageModal" class="btn-primary !py-2 !text-xs">Close</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ═══════════════ SCHOLARSHIP MODAL ═══════════════ -->
    <Transition name="modal">
      <div v-if="scholarshipModalVisible" class="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4" @click.self="closeScholarshipModal">
        <div class="modal-card max-w-3xl max-h-[90vh]">
          <div class="modal-header">
            <h3 class="modal-title">{{ editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship' }}</h3>
            <button @click="closeScholarshipModal" class="icon-btn"><X class="w-5 h-5" /></button>
          </div>
          <form @submit.prevent="saveScholarship" class="space-y-4 overflow-y-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="lbl">Title *</label>
                <input v-model="scholarshipForm.title" type="text" required class="input-base" />
              </div>
              <div>
                <label class="lbl">Country</label>
                <input v-model="scholarshipForm.country" type="text" class="input-base" />
              </div>
              <div>
                <label class="lbl">Degree</label>
                <input v-model="scholarshipForm.degree" type="text" class="input-base" />
              </div>
              <div>
                <label class="lbl">Deadline</label>
                <input v-model="scholarshipForm.deadline" type="date" class="input-base" />
              </div>
              <div>
                <label class="lbl">Application Link</label>
                <input v-model="scholarshipForm.link" type="url" class="input-base" />
              </div>
              <div>
                <label class="lbl">Image URL</label>
                <input v-model="scholarshipForm.image_url" type="url" class="input-base" />
              </div>
              <div>
                <label class="lbl">Status</label>
                <select v-model="scholarshipForm.status" class="input-base">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div class="flex items-center gap-2 pt-6">
                <input type="checkbox" v-model="scholarshipForm.featured" id="featured" class="w-4 h-4 rounded accent-emerald-500" />
                <label for="featured" class="text-sm text-emerald-200">Featured Scholarship</label>
              </div>
            </div>
            <div>
              <label class="lbl">Description *</label>
              <textarea v-model="scholarshipForm.description" rows="4" required class="input-base" />
            </div>
            <div>
              <label class="lbl">Eligibility</label>
              <textarea v-model="scholarshipForm.eligibility" rows="3" class="input-base" />
            </div>
            <div>
              <label class="lbl">Benefits</label>
              <textarea v-model="scholarshipForm.benefits" rows="3" class="input-base" />
            </div>
            <div class="flex justify-end gap-2 pt-2">
              <button type="button" @click="closeScholarshipModal" class="btn-ghost">Cancel</button>
              <button type="submit" :disabled="saving" class="btn-primary">
                <Loader2 v-if="saving" class="w-4 h-4 animate-spin" />
                <Save v-else class="w-4 h-4" />
                {{ saving ? 'Saving…' : 'Save' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- ═══════════════ TOASTS ═══════════════ -->
    <div class="fixed bottom-5 right-5 z-[60] flex flex-col gap-2 pointer-events-none">
      <TransitionGroup name="toast">
        <div v-for="t in toasts" :key="t.id" class="pointer-events-auto w-[340px] bg-[#0a1f14]/95 backdrop-blur-xl border border-white/15 rounded-xl shadow-2xl overflow-hidden">
          <div class="flex items-start gap-3 p-4">
            <div
              class="p-1.5 rounded-lg shrink-0"
              :class="{
                'bg-emerald-500/15 text-emerald-400': t.type === 'success',
                'bg-rose-500/15 text-rose-400': t.type === 'error',
                'bg-lime-500/15 text-lime-400': t.type === 'info'
              }"
            >
              <CheckCircle v-if="t.type === 'success'" class="w-4 h-4" />
              <AlertCircle v-else-if="t.type === 'error'" class="w-4 h-4" />
              <Bell v-else class="w-4 h-4" />
            </div>
            <p class="text-sm text-white flex-1 leading-snug">{{ t.message }}</p>
            <button @click="dismissToast(t.id)" class="text-white/40 hover:text-white transition"><X class="w-4 h-4" /></button>
          </div>
          <div class="h-0.5 bg-white/10">
            <div
              class="h-full origin-left"
              :class="{
                'bg-gradient-to-r from-emerald-400 to-teal-400': t.type === 'success',
                'bg-gradient-to-r from-rose-500 to-red-500': t.type === 'error',
                'bg-gradient-to-r from-lime-400 to-emerald-400': t.type === 'info'
              }"
              :style="{ animation: `toastbar ${TOAST_DURATION}ms linear forwards` }"
            />
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch, defineComponent, h } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import {
  MessageSquare, GraduationCap, Clock, Download, Trash2, Eye, Edit, Plus, Save,
  X, LogOut, Key, ChevronDown, Mail, Phone, Calendar, BookOpen, Star, User, AlertCircle,
  CheckCircle, Search, Loader2, ArrowUpRight, ArrowDownRight, Bell, RefreshCw, Sparkles
} from 'lucide-vue-next'
import { readDatabase, updateDatabase } from '../lib/jsonbin'

const API_URL = 'https://newbackend-gamma.vercel.app/api'

/* ═══════════════ INLINE COMPONENTS ═══════════════ */
const DataPanel = defineComponent({
  props: { title: String, subtitle: String, count: Number, search: String },
  emits: ['update:search'],
  setup(props, { slots, emit }) {
    return () => h('div', { class: 'overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.07] via-white/[0.035] to-white/[0.015] shadow-2xl shadow-black/20 backdrop-blur-xl' }, [
      h('div', { class: 'p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-b border-white/10 bg-gradient-to-r from-emerald-500/[0.04] to-transparent' }, [
        h('div', [
          h('div', { class: 'flex items-center gap-3' }, [
            h('h2', { class: 'text-lg font-semibold text-white' }, props.title),
            h('span', { class: 'px-2 py-0.5 text-[10px] rounded-full bg-gradient-to-r from-emerald-500/20 to-lime-500/10 text-emerald-200 border border-emerald-500/20 tabular-nums' }, String(props.count ?? 0)),
          ]),
          h('p', { class: 'text-xs text-emerald-400 mt-0.5' }, props.subtitle),
        ]),
        h('div', { class: 'flex items-center gap-2' }, [
          h('div', { class: 'relative' }, [
            h(Search, { class: 'w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-emerald-400 pointer-events-none' }),
            h('input', {
              value: props.search,
              onInput: (e) => emit('update:search', e.target.value),
              placeholder: 'Search…',
              class: 'bg-black/40 border border-white/10 rounded-lg pl-9 pr-3 py-2 text-sm text-white placeholder-emerald-400/60 focus:ring-2 focus:ring-emerald-500/60 focus:border-emerald-500/50 transition w-full md:w-52'
            }),
          ]),
          slots.actions && slots.actions(),
        ]),
      ]),
      h('div', {}, slots.default?.()),
    ])
  }
})

const EmptyState = defineComponent({
  props: { icon: Object, title: String, subtitle: String },
  setup(props) {
    return () => h('div', { class: 'px-6 py-16 text-center text-emerald-300 animate-fade-in' }, [
      h('div', { class: 'inline-flex p-4 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-lime-500/5 border border-emerald-500/20 mb-3 animate-bounce-slow' }, [
        props.icon ? h(props.icon, { class: 'w-8 h-8 opacity-70 text-emerald-400' }) : null
      ]),
      h('p', { class: 'font-medium text-white' }, props.title),
      h('p', { class: 'text-sm mt-1 text-emerald-400' }, props.subtitle),
    ])
  }
})

const Field = defineComponent({
  props: { label: String, value: String, icon: Object },
  setup(props) {
    return () => h('div', { class: 'p-3 bg-gradient-to-br from-white/[0.06] to-white/[0.02] rounded-lg border border-white/5 transition-all hover:border-white/10' }, [
      h('div', { class: 'text-[11px] uppercase tracking-wide text-emerald-400 mb-1 flex items-center gap-1.5' }, [
        props.icon ? h(props.icon, { class: 'w-3 h-3' }) : null,
        props.label,
      ]),
      h('p', { class: 'text-white whitespace-pre-wrap leading-relaxed' }, props.value || '—'),
    ])
  }
})

/* ═══════════════ AUTH ═══════════════ */
const router = useRouter()
const token = localStorage.getItem('adminToken')
if (!token) router.push('/login')

/* ═══════════════ STATS ═══════════════ */
const stats = ref({ totalContacts: 0, totalScholarships: 0, totalInquiries: 0 })
const animatedStats = ref({ totalContacts: 0, totalScholarships: 0, totalInquiries: 0 })

const animateNumber = (key, target) => {
  const safeTarget = Number.isFinite(target) ? target : 0
  const start = animatedStats.value[key] || 0
  const diff = safeTarget - start
  if (diff === 0) { animatedStats.value[key] = safeTarget; return }
  const dur = 900
  const t0 = performance.now()
  const step = (now) => {
    const p = Math.min((now - t0) / dur, 1)
    const eased = 1 - Math.pow(1 - p, 3)
    animatedStats.value[key] = Math.round(start + diff * eased)
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

const statCards = computed(() => [
  {
    key: 'totalContacts', label: 'Messages', icon: MessageSquare, sub: 'From contact form', trend: 1,
    accent: 'from-emerald-500 via-teal-500 to-lime-400',
    glow: 'from-emerald-500/10 to-transparent',
    iconBg: 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30',
    iconColor: 'text-emerald-300',
  },
  {
    key: 'totalScholarships', label: 'Scholarships', icon: GraduationCap, sub: 'Total opportunities', trend: 1,
    accent: 'from-teal-500 via-emerald-500 to-green-400',
    glow: 'from-teal-500/10 to-transparent',
    iconBg: 'from-teal-500/20 to-emerald-500/10 border-teal-500/30',
    iconColor: 'text-teal-300',
  },
  {
    key: 'totalInquiries', label: 'Inquiries', icon: Clock, sub: 'Pending review', trend: 1,
    accent: 'from-lime-400 via-green-500 to-emerald-400',
    glow: 'from-lime-500/10 to-transparent',
    iconBg: 'from-lime-500/20 to-green-500/10 border-lime-500/30',
    iconColor: 'text-lime-300',
  },
])

/* ═══════════════ TABS & NOTIFICATIONS ═══════════════ */
const activeTab = ref('messages')
const showNotifications = ref(false)

/* ═══════════════ DATA ═══════════════ */
const contacts = ref([])
const inquiries = ref([])
const allScholarships = ref([])

const search = ref({ contacts: '', inquiries: '', scholarships: '' })

const notificationItems = computed(() => {
  const messageItems = contacts.value.slice(0, 5).map((message) => ({
    id: `message-${message.id}`,
    type: 'message',
    title: displayName(message),
    description: message.message || message.subject || 'New frontend message',
    message,
  }))
  const scholarshipItems = allScholarships.value.slice(0, 5).map((scholarship) => ({
    id: `scholarship-${scholarship.id}`,
    type: 'scholarship',
    title: scholarship.title || 'New scholarship',
    description: `${scholarship.country || 'International'} · ${scholarship.degree || 'All levels'}`,
    image: scholarship.image_url || scholarship.image,
    scholarship,
  }))
  return [...messageItems, ...scholarshipItems].slice(0, 8)
})

const openNotification = (item) => {
  showNotifications.value = false
  if (item.type === 'message') {
    activeTab.value = 'messages'
    viewMessage(item.message)
  } else {
    activeTab.value = 'scholarships'
  }
}

/* ═══════════════ HELPERS ═══════════════ */
const displayName = (m) => {
  if (!m) return 'N/A'
  return m.full_name || m.fullName || m.name || 'N/A'
}
const initial = (m) => {
  const n = displayName(m)
  return n === 'N/A' ? '?' : n.charAt(0).toUpperCase()
}

const formatDate = (dateStr, withTime = false) => {
  if (!dateStr) return 'N/A'
  const d = new Date(dateStr)
  if (isNaN(d.getTime())) return 'N/A'
  return d.toLocaleDateString() + (withTime ? ' ' + d.toLocaleTimeString() : '')
}

/* ═══════════════ FILTERED LISTS ═══════════════ */
const filteredContacts = computed(() => {
  const q = (search.value.contacts || '').toLowerCase()
  if (!q) return contacts.value
  return contacts.value.filter(c =>
    [c.full_name, c.fullName, c.name, c.email, c.subject].some(v => String(v || '').toLowerCase().includes(q))
  )
})
const filteredInquiries = computed(() => {
  const q = (search.value.inquiries || '').toLowerCase()
  if (!q) return inquiries.value
  return inquiries.value.filter(i =>
    [i.full_name, i.fullName, i.name, i.email, i.scholarship_title].some(v => String(v || '').toLowerCase().includes(q))
  )
})
const filteredScholarships = computed(() => {
  const q = (search.value.scholarships || '').toLowerCase()
  if (!q) return allScholarships.value
  return allScholarships.value.filter(s =>
    [s.title, s.country, s.degree].some(v => String(v || '').toLowerCase().includes(q))
  )
})

const tabs = computed(() => [
  { id: 'messages',     name: 'Messages',     icon: MessageSquare, count: contacts.value.length },
  { id: 'inquiries',    name: 'Inquiries',    icon: Clock,         count: inquiries.value.length },
  { id: 'scholarships', name: 'Scholarships', icon: GraduationCap, count: allScholarships.value.length },
])

/* ═══════════════ SETTINGS ═══════════════ */
const showSettings = ref(false)
const passwordForm = ref({ currentPassword: '', newPassword: '', confirmPassword: '' })
const passwordMessage = ref('')
const passwordMessageType = ref('success')
const usernameForm = ref({ newUsername: '', currentPassword: '' })
const usernameMessage = ref('')
const usernameMessageType = ref('success')
const adminUsername = ref(localStorage.getItem('adminUsername') || 'admin')

/* ═══════════════ MODALS ═══════════════ */
const messageModalVisible = ref(false)
const selectedMessage = ref(null)
const scholarshipModalVisible = ref(false)
const editingScholarship = ref(null)
const saving = ref(false)
const replyMessage = ref('')
const replySending = ref(false)
const replyStatus = ref('')
const replyStatusType = ref('success')

const scholarshipForm = ref({
  title: '', country: '', degree: '', deadline: '', link: '', image_url: '',
  status: 'active', featured: false, description: '', eligibility: '', benefits: ''
})

/* ═══════════════ TOASTS ═══════════════ */
const TOAST_DURATION = 4000
const toasts = ref([])
let toastId = 0

const showToast = (message, type = 'success') => {
  const id = ++toastId
  toasts.value.push({ id, message, type })
  setTimeout(() => dismissToast(id), TOAST_DURATION)
}
const dismissToast = (id) => {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

/* ═══════════════ EXPORT CSV ═══════════════ */
const exportCSV = (rows, name) => {
  if (!Array.isArray(rows) || rows.length === 0) return
  const headers = Object.keys(rows[0])
  const escape = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`
  const csv = [
    headers.join(','),
    ...rows.map(r => headers.map(h => escape(r[h])).join(','))
  ].join('\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${name}-${new Date().toISOString().slice(0, 10)}.csv`
  a.click()
  URL.revokeObjectURL(url)
  showToast(`Exported ${rows.length} ${name}`, 'success')
}

/* ═══════════════ STORAGE ═══════════════ */
const cloudAvailable = ref(true)
const LOCAL_DATABASE_KEY = 'goabroad_jsonbin_fallback'

const readLocal = () => {
  try {
    const raw = JSON.parse(localStorage.getItem(LOCAL_DATABASE_KEY) || '{}')
    return (raw && typeof raw === 'object' && !Array.isArray(raw)) ? raw : {}
  } catch { return {} }
}
const writeLocal = (db) => {
  try { localStorage.setItem(LOCAL_DATABASE_KEY, JSON.stringify(db || {})) } catch {}
}

const applyDatabase = (db) => {
  const safe = (db && typeof db === 'object' && !Array.isArray(db)) ? db : {}
  contacts.value = Array.isArray(safe.contacts) ? safe.contacts : []
  inquiries.value = Array.isArray(safe.inquiries) ? safe.inquiries : []
  allScholarships.value = Array.isArray(safe.scholarships) ? safe.scholarships : []
  stats.value = {
    totalContacts: contacts.value.length,
    totalScholarships: allScholarships.value.length,
    totalInquiries: inquiries.value.filter(i => (i.status || 'pending') === 'pending').length,
  }
}

const loadAll = async () => {
  try {
    const db = await readDatabase()
    const local = readLocal()
    const cloudContacts = Array.isArray(db.contacts) ? db.contacts : []
    const localContacts = Array.isArray(local.contacts) ? local.contacts : []
    const knownIds = new Set(cloudContacts.map((m) => m.id))
    const merged = {
      ...db,
      contacts: cloudContacts.concat(localContacts.filter((m) => !knownIds.has(m.id)))
    }
    cloudAvailable.value = true
    applyDatabase(merged)
  } catch (e) {
    cloudAvailable.value = false
    applyDatabase(readLocal())
    showToast(`${e?.message || 'Cloud unavailable'} — running in local mode.`, 'error')
  }
}

const persist = async (mutator) => {
  if (cloudAvailable.value) {
    try {
      const updated = await updateDatabase(mutator)
      applyDatabase(updated)
      return true
    } catch (e) {
      cloudAvailable.value = false
      showToast('Cloud write failed. Saving locally.', 'error')
    }
  }
  const db = readLocal()
  let result
  try { result = mutator(db) } catch { result = db }
  const next = (result && typeof result === 'object' && !Array.isArray(result)) ? result : db
  writeLocal(next)
  applyDatabase(next)
  return false
}

/* ═══════════════ CRUD ═══════════════ */
const deleteContact = async (id) => {
  await persist(db => ({ ...db, contacts: (db.contacts || []).filter(x => x.id !== id) }))
  const local = readLocal()
  if (Array.isArray(local.contacts)) {
    writeLocal({ ...local, contacts: local.contacts.filter((m) => m.id !== id) })
  }
  showToast('Message deleted', 'success')
}
const deleteInquiry = async (id) => {
  await persist(db => ({ ...db, inquiries: (db.inquiries || []).filter(x => x.id !== id) }))
  showToast('Inquiry deleted', 'success')
}
const updateInquiryStatus = async (id, status) => {
  await persist(db => ({ ...db, inquiries: (db.inquiries || []).map(i => i.id === id ? { ...i, status } : i) }))
  showToast(`Status updated to ${status}`, 'success')
}
const deleteScholarship = async (id) => {
  await persist(db => ({ ...db, scholarships: (db.scholarships || []).filter(x => x.id !== id) }))
  showToast('Scholarship deleted', 'success')
}
const toggleFeatured = async (id, featured) => {
  await persist(db => ({ ...db, scholarships: (db.scholarships || []).map(s => s.id === id ? { ...s, featured: !featured } : s) }))
  showToast(`Featured ${!featured ? 'enabled' : 'disabled'}`, 'success')
}
const updateScholarshipStatus = async (id, status) => {
  await persist(db => ({ ...db, scholarships: (db.scholarships || []).map(s => s.id === id ? { ...s, status } : s) }))
  showToast(`Status: ${status}`, 'success')
}

/* ═══════════════ MODAL ACTIONS ═══════════════ */
const viewMessage = (msg) => {
  selectedMessage.value = msg
  replyMessage.value = ''
  replyStatus.value = ''
  messageModalVisible.value = true
}
const viewInquiry = (inq) => { selectedMessage.value = inq; messageModalVisible.value = true }
const closeMessageModal = () => {
  messageModalVisible.value = false
  selectedMessage.value = null
  replyMessage.value = ''
  replyStatus.value = ''
}
const callPhone = () => {
  const m = selectedMessage.value
  if (!m) return
  const phone = m.phone || m.phone_number || m.mobile
  if (!phone) return
  window.location.href = `tel:${phone}`
}

const sendReply = async () => {
  if (!selectedMessage.value?.email || !replyMessage.value.trim()) return
  replySending.value = true
  replyStatus.value = ''
  try {
    await axios.post(`${API_URL}/reply`, {
      to: selectedMessage.value.email,
      subject: `Re: ${selectedMessage.value.subject || 'Your message'}`,
      message: replyMessage.value,
      originalMessage: selectedMessage.value.message,
    }, { timeout: 15000 })
    replyStatusType.value = 'success'
    replyStatus.value = 'Reply sent successfully.'
    replyMessage.value = ''
    showToast('Reply sent', 'success')
  } catch (e) {
    replyStatusType.value = 'error'
    replyStatus.value = 'Could not send reply. Try email link instead.'
    showToast('Reply failed', 'error')
  } finally {
    replySending.value = false
  }
}

const openScholarshipModal = () => {
  editingScholarship.value = null
  scholarshipForm.value = {
    title: '', country: '', degree: '', deadline: '', link: '', image_url: '',
    status: 'active', featured: false, description: '', eligibility: '', benefits: ''
  }
  scholarshipModalVisible.value = true
}
const editScholarship = (sch) => {
  editingScholarship.value = sch
  scholarshipForm.value = { ...sch }
  scholarshipModalVisible.value = true
}
const closeScholarshipModal = () => {
  scholarshipModalVisible.value = false
  editingScholarship.value = null
}
const saveScholarship = async () => {
  saving.value = true
  try {
    const item = {
      ...scholarshipForm.value,
      id: editingScholarship.value?.id || `scholarship-${Date.now()}`,
      createdAt: editingScholarship.value?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    const wasEditing = !!editingScholarship.value
    await persist(db => {
      const list = db.scholarships || []
      const next = wasEditing
        ? list.map(s => s.id === item.id ? item : s)
        : [item, ...list]
      return { ...db, scholarships: next }
    })
    showToast(wasEditing ? 'Scholarship updated' : 'Scholarship added', 'success')
    scholarshipModalVisible.value = false
  } catch (e) {
    showToast(e?.message || 'Failed to save', 'error')
  } finally {
    saving.value = false
  }
}

/* ═══════════════ AUTH ACTIONS ═══════════════ */
const logout = () => {
  localStorage.removeItem('adminToken')
  router.push('/login')
}

const changeAdminPassword = () => {
  const { currentPassword, newPassword, confirmPassword } = passwordForm.value
  if (!currentPassword || !newPassword || !confirmPassword) {
    passwordMessageType.value = 'error'; passwordMessage.value = 'All fields are required.'; return
  }
  if (newPassword !== confirmPassword) {
    passwordMessageType.value = 'error'; passwordMessage.value = 'Passwords do not match.'; return
  }
  if (newPassword.length < 6) {
    passwordMessageType.value = 'error'; passwordMessage.value = 'Password must be at least 6 characters.'; return
  }
  passwordMessageType.value = 'success'
  passwordMessage.value = 'Password updated.'
  passwordForm.value = { currentPassword: '', newPassword: '', confirmPassword: '' }
  showToast('Password updated', 'success')
}

const changeAdminUsername = () => {
  const { newUsername, currentPassword } = usernameForm.value
  if (!newUsername || !currentPassword) {
    usernameMessageType.value = 'error'; usernameMessage.value = 'Both fields are required.'; return
  }
  adminUsername.value = newUsername
  localStorage.setItem('adminUsername', newUsername)
  usernameForm.value = { newUsername: '', currentPassword: '' }
  usernameMessageType.value = 'success'
  usernameMessage.value = 'Username updated.'
  showToast('Username updated', 'success')
}

/* ═══════════════ LIFECYCLE ═══════════════ */
const loading = ref(true)
const refreshing = ref(false)

const refreshAll = async () => {
  refreshing.value = true
  await loadAll()
  refreshing.value = false
}

onMounted(async () => {
  await loadAll()
  loading.value = false
})

watch(stats, (s) => {
  animateNumber('totalContacts', s.totalContacts || 0)
  animateNumber('totalScholarships', s.totalScholarships || 0)
  animateNumber('totalInquiries', s.totalInquiries || 0)
}, { deep: true, immediate: true })
</script>

<style scoped>
/* ═══════════════ ANIMATIONS ═══════════════ */
@keyframes float {
  0%, 100% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(20px, -30px) scale(1.05); }
}
@keyframes slide-down { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }
@keyframes slide-up { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
@keyframes stat-in { from { opacity: 0; transform: translateY(16px) scale(0.98); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
@keyframes toastbar { from { transform: scaleX(1); } to { transform: scaleX(0); } }
@keyframes modal-pop {
  from { opacity: 0; transform: scale(0.94) translateY(12px); }
  to { opacity: 1; transform: scale(1) translateY(0); }
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
}
@keyframes notification-in {
  from { opacity: 0; transform: translateY(-8px) scale(0.97); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
}

.animate-float { animation: float 14s ease-in-out infinite; }
.animate-float-delayed { animation: float 18s ease-in-out infinite; animation-delay: -4s; }
.animate-float-slow { animation: float 22s ease-in-out infinite; animation-delay: -8s; }
.animate-slide-down { animation: slide-down 0.4s ease-out both; }
.animate-slide-up { animation: slide-up 0.45s cubic-bezier(0.22, 1, 0.36, 1) both; }
.animate-fade-in { animation: fade-in 0.4s ease-out both; }
.animate-pulse-dot { animation: pulse-dot 2s ease-in-out infinite; }
.animate-bounce-slow { animation: bounce-slow 2.5s ease-in-out infinite; }
.stat-card { animation: stat-in 0.55s cubic-bezier(0.22, 1, 0.36, 1) both; }

.skeleton {
  background: linear-gradient(90deg, rgba(255,255,255,0.04) 0%, rgba(16,185,129,0.10) 50%, rgba(255,255,255,0.04) 100%);
  background-size: 800px 100%;
  animation: shimmer 1.4s linear infinite;
}

.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { scrollbar-width: none; }

/* ═══════════════ TABLE ═══════════════ */
.th {
  padding: 0.85rem 1.25rem;
  text-align: left;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(167, 243, 208, 0.85);
  white-space: nowrap;
}
.td { padding: 0.9rem 1.25rem; font-size: 0.875rem; white-space: nowrap; }
.tr { transition: background-color 0.2s ease, transform 0.2s ease; }
.tr:hover { background: linear-gradient(90deg, rgba(16,185,129,0.05), rgba(163,230,53,0.02)); transform: translateX(2px); }

/* ═══════════════ PILLS ═══════════════ */
.pill {
  display: inline-flex; align-items: center;
  padding: 0.2rem 0.6rem;
  font-size: 0.7rem; font-weight: 500;
  border-radius: 999px;
  border: 1px solid transparent;
}
.pill-emerald { background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(163,230,53,0.10)); color: #a7f3d0; border-color: rgba(16,185,129,0.3); }
.pill-purple { background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(163,230,53,0.10)); color: #a7f3d0; border-color: rgba(16,185,129,0.3); }

/* ═══════════════ BUTTONS ═══════════════ */
.btn-primary {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 0.6rem;
  background: linear-gradient(135deg, #10b981, #059669 60%, #a3e635);
  color: #fff; font-weight: 600; font-size: 0.875rem;
  transition: transform 0.15s ease, box-shadow 0.2s ease, filter 0.2s ease;
  box-shadow: 0 8px 24px -8px rgba(16, 185, 129, 0.55);
}
.btn-primary:hover { transform: translateY(-1px); filter: brightness(1.08); box-shadow: 0 10px 28px -8px rgba(16, 185, 129, 0.75); }
.btn-primary:active { transform: translateY(0) scale(0.98); }
.btn-primary:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

.btn-ghost {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 0.6rem;
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  color: #d1fae5; font-size: 0.875rem; font-weight: 500;
  transition: all 0.2s ease;
}
.btn-ghost:hover {
  background: linear-gradient(135deg, rgba(16,185,129,0.12), rgba(163,230,53,0.08));
  border-color: rgba(16,185,129,0.3);
  transform: translateY(-1px);
}
.btn-ghost:active { transform: scale(0.98); }

.btn-danger {
  display: inline-flex; align-items: center; gap: 0.5rem;
  padding: 0.6rem 1rem;
  border-radius: 0.6rem;
  background: linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,150,105,0.10));
  border: 1px solid rgba(16, 185, 129, 0.35);
  color: #a7f3d0; font-size: 0.875rem; font-weight: 500;
  transition: all 0.2s ease;
}
.btn-danger:hover {
  background: linear-gradient(135deg, rgba(16,185,129,0.28), rgba(5,150,105,0.18));
  border-color: rgba(16, 185, 129, 0.55);
  transform: translateY(-1px);
}

.icon-btn {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 0.4rem; border-radius: 0.5rem;
  color: #d1fae5; transition: all 0.2s ease;
}
.icon-btn:hover { background: rgba(255,255,255,0.08); color: #fff; transform: translateY(-1px) scale(1.05); }
.icon-btn-info:hover { background: linear-gradient(135deg, rgba(16,185,129,0.2), rgba(163,230,53,0.15)); color: #a7f3d0; }
.icon-btn-danger:hover { background: linear-gradient(135deg, rgba(244,63,94,0.2), rgba(220,38,38,0.15)); color: #fda4af; }

/* ═══════════════ INPUTS ═══════════════ */
.input-base {
  width: 100%;
  background: rgba(0,0,0,0.4);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 0.6rem;
  padding: 0.6rem 0.85rem;
  color: #fff; font-size: 0.875rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}
.input-base::placeholder { color: rgba(167,243,208,0.5); }
.input-base:focus {
  outline: none;
  border-color: rgba(16,185,129,0.6);
  box-shadow: 0 0 0 3px rgba(16,185,129,0.15);
}
.lbl { display: block; font-size: 0.75rem; color: #d1fae5; margin-bottom: 0.35rem; }

.select-mini {
  background: rgba(0,0,0,0.5);
  border: 1px solid;
  border-radius: 0.5rem;
  padding: 0.35rem 0.6rem;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.select-mini:focus { outline: none; box-shadow: 0 0 0 3px rgba(16,185,129,0.2); }
.select-yellow { border-color: rgba(163,230,53,0.4); color: #bef264; background: linear-gradient(135deg, rgba(163,230,53,0.06), transparent); }
.select-green { border-color: rgba(16,185,129,0.4); color: #6ee7b7; background: linear-gradient(135deg, rgba(16,185,129,0.06), transparent); }
.select-red { border-color: rgba(244,63,94,0.4); color: #fda4af; background: linear-gradient(135deg, rgba(244,63,94,0.06), transparent); }
.select-mini option { background: #0a1f14; color: #fff; }

/* ═══════════════ MODAL ═══════════════ */
.modal-card {
  width: 100%;
  background: linear-gradient(to bottom right, #0d2818, #02120a);
  border: 1px solid rgba(16, 185, 129, 0.18);
  border-radius: 1.25rem;
  box-shadow:
    0 30px 80px -20px rgba(0,0,0,0.85),
    0 0 0 1px rgba(255,255,255,0.02) inset,
    0 0 60px -20px rgba(16,185,129,0.25);
  padding: 1.5rem;
  overflow-y: auto;
}
.modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.modal-title { font-size: 1.15rem; font-weight: 700; color: #fff; }

/* ═══════════════ VUE TRANSITIONS ═══════════════ */
.fade-enter-active, .fade-leave-active { transition: opacity 0.25s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

.modal-enter-active { transition: opacity 0.25s ease; }
.modal-leave-active { transition: opacity 0.2s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-active .modal-card { animation: modal-pop 0.35s cubic-bezier(0.22, 1.4, 0.36, 1); }

.toast-enter-active { transition: all 0.35s cubic-bezier(0.22, 1.4, 0.36, 1); }
.toast-leave-active { transition: all 0.25s ease; }
.toast-enter-from { opacity: 0; transform: translateX(40px) scale(0.96); }
.toast-leave-to { opacity: 0; transform: translateX(20px) scale(0.98); }
.toast-move { transition: transform 0.3s ease; }

.accordion-enter-active, .accordion-leave-active { transition: all 0.3s ease; overflow: hidden; }
.accordion-enter-from, .accordion-leave-to { max-height: 0; opacity: 0; }
.accordion-enter-to, .accordion-leave-from { max-height: 800px; opacity: 1; }

.row-enter-active { transition: all 0.35s cubic-bezier(0.22, 1, 0.36, 1); }
.row-leave-active { transition: all 0.25s ease; position: absolute; opacity: 0.6; }
.row-enter-from { opacity: 0; transform: translateY(-8px); }
.row-leave-to { opacity: 0; transform: translateX(-12px); }
.row-move { transition: transform 0.35s ease; }

.notification-pop-enter-active { animation: notification-in 0.28s cubic-bezier(0.22, 1.4, 0.36, 1); }
.notification-pop-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.notification-pop-enter-from,
.notification-pop-leave-to { opacity: 0; transform: translateY(-8px) scale(0.97); }

/* ═══════════════ SCROLLBAR ═══════════════ */
::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: rgba(255,255,255,0.04); border-radius: 8px; }
::-webkit-scrollbar-thumb {
  background: linear-gradient(180deg, rgba(16,185,129,0.4), rgba(163,230,53,0.25));
  border-radius: 8px;
}
::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(180deg, rgba(16,185,129,0.6), rgba(163,230,53,0.4));
}

.line-clamp-1 { display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; }
.line-clamp-2 { display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.tabular-nums { font-variant-numeric: tabular-nums; }

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
</style>