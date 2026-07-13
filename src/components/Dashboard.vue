<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-950 via-gray-900 to-black">
    <!-- Top Bar: Logout Button -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-end">
      <button @click="logout" class="bg-red-500/20 hover:bg-red-500/40 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg flex items-center gap-2 transition border border-red-500/30">
        <LogOut class="w-4 h-4" />
        Logout
      </button>
    </div>

    <main class="pb-12 px-4 sm:px-6 lg:px-8 container mx-auto">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        <div v-for="(stat, idx) in statCards" :key="stat.label" class="bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl rounded-2xl p-6 border border-white/20 hover:border-yellow-500/50 shadow-lg hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 cursor-pointer group">
          <div class="flex items-center justify-between mb-4">
            <div class="p-3 rounded-full bg-gradient-to-br from-yellow-500/20 to-purple-500/20 border border-yellow-500/30 group-hover:from-yellow-500/30 group-hover:to-purple-500/30 transition-all duration-300">
              <component :is="stat.icon" class="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-transform" />
            </div>
            <span class="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-500 bg-clip-text text-transparent">{{ stat.value }}</span>
          </div>
          <h3 class="text-purple-100 font-semibold group-hover:text-white transition-colors">{{ stat.label }}</h3>
          <p class="text-xs text-purple-400 mt-2">{{ stat.sub }}</p>
        </div>
      </div>

      <!-- Settings Accordion -->
      <div class="space-y-4 mb-12">
        <div class="bg-white/5 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
          <div class="p-5 flex items-center gap-3 cursor-pointer hover:bg-white/10 transition-all" @click="toggleSettings">
            <Key class="w-5 h-5 text-yellow-500" />
            <h2 class="text-lg font-semibold text-white">Change Password / Username</h2>
            <ChevronDown class="ml-auto w-5 h-5 text-purple-300 transition-transform duration-300" :class="{ 'rotate-180': showSettings }" />
          </div>
          <div v-show="showSettings" class="p-5 border-t border-white/10 space-y-6">
            <form @submit.prevent="changeAdminPassword" class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input type="password" v-model="passwordForm.currentPassword" placeholder="Current password" class="bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:ring-2 focus:ring-yellow-500" />
              <input type="password" v-model="passwordForm.newPassword" placeholder="New password" class="bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:ring-2 focus:ring-yellow-500" />
              <input type="password" v-model="passwordForm.confirmPassword" placeholder="Confirm new password" class="bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-purple-300 focus:ring-2 focus:ring-yellow-500" />
              <button type="submit" class="md:col-span-3 bg-yellow-500 text-black font-medium py-2 rounded-lg hover:bg-yellow-400 transition">Update Password</button>
            </form>
            <div v-if="passwordMessage" class="text-sm" :class="passwordMessageType === 'success' ? 'text-green-400' : 'text-red-400'">{{ passwordMessage }}</div>
            <form @submit.prevent="changeAdminUsername" class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input type="text" disabled :value="adminUsername" class="bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-gray-400" />
              <input type="text" v-model="usernameForm.newUsername" placeholder="New username" class="bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-500" />
              <input type="password" v-model="usernameForm.currentPassword" placeholder="Current password" class="bg-black/30 border border-white/20 rounded-lg px-4 py-2 text-white focus:ring-2 focus:ring-yellow-500" />
              <button type="submit" class="bg-yellow-500 text-black font-medium py-2 rounded-lg hover:bg-yellow-400 transition">Update Username</button>
            </form>
            <div v-if="usernameMessage" class="text-sm" :class="usernameMessageType === 'success' ? 'text-green-400' : 'text-red-400'">{{ usernameMessage }}</div>
          </div>
        </div>
      </div>

      <!-- Tabs -->
      <div class="border-b border-white/20 mb-6 overflow-x-auto">
        <div class="flex gap-6 min-w-max">
          <button v-for="tab in tabs" :key="tab.id" @click="activeTab = tab.id" class="py-2 px-1 text-sm font-medium transition-all duration-200 border-b-2 group" :class="activeTab === tab.id ? 'border-yellow-500 text-yellow-500 shadow-lg shadow-yellow-500/30' : 'border-transparent text-purple-300 hover:text-white hover:border-purple-400/50'">
            <component :is="tab.icon" class="w-4 h-4 inline mr-2 group-hover:scale-110 transition-transform" />
            {{ tab.name }}
            <span class="ml-2 px-2 py-0.5 text-xs rounded-full transition-all" :class="activeTab === tab.id ? 'bg-yellow-500/30 text-yellow-100 font-semibold' : 'bg-white/10 text-white group-hover:bg-white/20'">{{ tab.count }}</span>
          </button>
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex flex-col justify-center items-center py-20 gap-4">
        <div class="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-yellow-500 border-r-yellow-500"></div>
        <p class="text-purple-300 font-medium">Loading dashboard data...</p>
      </div>

      <!-- TAB CONTENTS (subscribers, contacts, inquiries, scholarships) -->
      <!-- Keep all your existing table sections exactly as they were -->
      <!-- I'll include a placeholder for brevity, but you should copy your existing table code -->
      <div v-else>
        <!-- Subscribers Table -->
        <section v-if="activeTab === 'subscribers'">
          <!-- Your existing subscribers table -->
          <div class="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-lg">
            <div class="p-5 flex justify-between items-center border-b border-white/20 bg-white/5">
              <div>
                <h2 class="text-xl font-semibold text-white">Newsletter Subscribers</h2>
                <p class="text-sm text-purple-300 mt-1">Manage your email newsletter subscribers</p>
              </div>
              <button @click="exportData('subscribers')" :disabled="subscribers.length === 0" class="bg-purple-600/50 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition disabled:opacity-50">
                <Download class="w-4 h-4" /> Export CSV
              </button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="bg-gradient-to-r from-purple-900/50 to-transparent border-b border-white/10">
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Email Address</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Subscribed Date</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  <tr v-for="sub in subscribers" :key="sub.id" class="hover:bg-white/5 transition-colors duration-200">
                    <td class="px-6 py-4 text-sm text-purple-300 font-mono">#{{ sub.id }}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2">
                        <Mail class="w-4 h-4 text-purple-400" />
                        <span class="text-white font-medium">{{ sub.email }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-sm text-purple-300">{{ formatDate(sub.subscribed_at) }}</td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-500/30">Active</span>
                    </td>
                    <td class="px-6 py-4">
                      <button @click="deleteSubscriber(sub.id)" class="text-red-400 hover:text-red-300 transition-colors p-1 hover:bg-red-500/10 rounded-lg">
                        <Trash2 class="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                  <tr v-if="subscribers.length === 0">
                    <td colspan="5" class="px-6 py-12 text-center text-purple-300">
                      <Users class="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No subscribers yet</p>
                      <p class="text-sm mt-1">Subscribers will appear here when they sign up</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- Contacts Table -->
        <section v-else-if="activeTab === 'contacts'">
          <!-- Your existing contacts table -->
          <div class="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-lg">
            <div class="p-5 flex justify-between items-center border-b border-white/20 bg-white/5">
              <div>
                <h2 class="text-xl font-semibold text-white">Contact Messages</h2>
                <p class="text-sm text-purple-300 mt-1">User inquiries from contact form</p>
              </div>
              <button @click="exportData('contacts')" :disabled="contacts.length === 0" class="bg-purple-600/50 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition">
                <Download class="w-4 h-4" /> Export CSV
              </button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="bg-gradient-to-r from-purple-900/50 to-transparent border-b border-white/10">
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Email</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Phone</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Subject</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Date</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  <tr v-for="msg in contacts" :key="msg.id" class="hover:bg-white/5 transition-colors duration-200">
                    <td class="px-6 py-4 text-sm text-purple-300 font-mono">#{{ msg.id }}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/30 to-yellow-500/30 flex items-center justify-center">
                          <span class="text-xs font-bold text-white">{{ (msg.full_name || msg.name || '?').charAt(0) }}</span>
                        </div>
                        <span class="text-white font-medium">{{ msg.full_name || msg.name || 'N/A' }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-purple-300">{{ msg.email || 'N/A' }}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-1">
                        <Phone class="w-3 h-3 text-purple-400" />
                        <span class="text-purple-300">{{ msg.phone || msg.phone_number || msg.mobile || '-' }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">{{ msg.subject || 'General' }}</span>
                    </td>
                    <td class="px-6 py-4 text-sm text-purple-300">{{ formatDate(msg.created_at) }}</td>
                    <td class="px-6 py-4">
                      <div class="flex gap-2">
                        <button @click="viewMessage(msg)" class="text-blue-400 hover:text-blue-300 transition-colors p-1 hover:bg-blue-500/10 rounded-lg">
                          <Eye class="w-4 h-4" />
                        </button>
                        <button @click="deleteContact(msg.id)" class="text-red-400 hover:text-red-300 transition-colors p-1 hover:bg-red-500/10 rounded-lg">
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="contacts.length === 0">
                    <td colspan="7" class="px-6 py-12 text-center text-purple-300">
                      <MessageSquare class="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No contact messages</p>
                      <p class="text-sm mt-1">Messages will appear here when users contact you</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- Inquiries Table -->
        <section v-else-if="activeTab === 'inquiries'">
          <!-- Your existing inquiries table -->
          <div class="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-lg">
            <div class="p-5 flex justify-between items-center border-b border-white/20 bg-white/5">
              <div>
                <h2 class="text-xl font-semibold text-white">Scholarship Inquiries</h2>
                <p class="text-sm text-purple-300 mt-1">Student scholarship assistance requests</p>
              </div>
              <button @click="exportData('inquiries')" :disabled="inquiries.length === 0" class="bg-purple-600/50 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition">
                <Download class="w-4 h-4" /> Export CSV
              </button>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="bg-gradient-to-r from-purple-900/50 to-transparent border-b border-white/10">
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Name</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Email</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Phone</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Scholarship</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Date</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  <tr v-for="inq in inquiries" :key="inq.id" class="hover:bg-white/5 transition-colors duration-200">
                    <td class="px-6 py-4 text-sm text-purple-300 font-mono">#{{ inq.id }}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/30 to-blue-500/30 flex items-center justify-center">
                          <span class="text-xs font-bold text-white">{{ (inq.full_name || inq.name || '?').charAt(0) }}</span>
                        </div>
                        <span class="text-white font-medium">{{ inq.full_name || inq.name || 'N/A' }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-purple-300">{{ inq.email || 'N/A' }}</td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-1">
                        <Phone class="w-3 h-3 text-purple-400" />
                        <span class="text-purple-300">{{ inq.phone || inq.phone_number || inq.mobile || '-' }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4 text-white max-w-xs truncate">{{ inq.scholarship_title || 'N/A' }}</td>
                    <td class="px-6 py-4">
                      <select :value="inq.status" @change="updateInquiryStatus(inq.id, $event.target.value)" class="bg-black/50 border rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-yellow-500 transition-colors" :class="inq.status === 'pending' ? 'border-yellow-500/50 text-yellow-400' : 'border-green-500/50 text-green-400'">
                        <option value="pending" class="bg-gray-900">Pending</option>
                        <option value="completed" class="bg-gray-900">Completed</option>
                      </select>
                    </td>
                    <td class="px-6 py-4 text-sm text-purple-300">{{ formatDate(inq.created_at) }}</td>
                    <td class="px-6 py-4">
                      <div class="flex gap-2">
                        <button @click="viewInquiry(inq)" class="text-blue-400 hover:text-blue-300 transition-colors p-1 hover:bg-blue-500/10 rounded-lg">
                          <Eye class="w-4 h-4" />
                        </button>
                        <button @click="deleteInquiry(inq.id)" class="text-red-400 hover:text-red-300 transition-colors p-1 hover:bg-red-500/10 rounded-lg">
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="inquiries.length === 0">
                    <td colspan="8" class="px-6 py-12 text-center text-purple-300">
                      <GraduationCap class="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No scholarship inquiries</p>
                      <p class="text-sm mt-1">Inquiries will appear here when students apply</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <!-- Scholarships Table -->
        <section v-else-if="activeTab === 'scholarships'">
          <!-- Your existing scholarships table -->
          <div class="bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden shadow-lg">
            <div class="p-5 flex flex-wrap justify-between items-center gap-3 border-b border-white/20 bg-white/5">
              <div>
                <h2 class="text-xl font-semibold text-white">Scholarships Management</h2>
                <p class="text-sm text-purple-300 mt-1">Create, edit, and manage scholarship opportunities</p>
              </div>
              <div class="flex gap-2">
                <button @click="openScholarshipModal" class="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition shadow-lg">
                  <Plus class="w-4 h-4" /> Add Scholarship
                </button>
                <button @click="exportScholarships" class="bg-purple-600/50 hover:bg-purple-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition">
                  <Download class="w-4 h-4" /> Export CSV
                </button>
              </div>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="bg-gradient-to-r from-purple-900/50 to-transparent border-b border-white/10">
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">ID</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Title</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Country</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Degree</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Deadline</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Status</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Featured</th>
                    <th class="px-6 py-4 text-left text-xs font-semibold text-purple-200 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-white/5">
                  <tr v-for="sch in allScholarships" :key="sch.id" class="hover:bg-white/5 transition-colors duration-200">
                    <td class="px-6 py-4 text-sm text-purple-300 font-mono">#{{ sch.id }}</td>
                    <td class="px-6 py-4">
                      <div>
                        <span class="text-white font-medium">{{ sch.title }}</span>
                        <p class="text-xs text-purple-400 mt-0.5 line-clamp-1">{{ sch.description?.substring(0, 60) }}...</p>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-1">
                        <MapPin class="w-3 h-3 text-purple-400" />
                        <span class="text-purple-300">{{ sch.country || '-' }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <span class="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400">{{ sch.degree || '-' }}</span>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex items-center gap-1">
                        <Calendar class="w-3 h-3 text-purple-400" />
                        <span class="text-purple-300">{{ formatDate(sch.deadline) }}</span>
                      </div>
                    </td>
                    <td class="px-6 py-4">
                      <select :value="sch.status" @change="updateScholarshipStatus(sch.id, $event.target.value)" class="bg-black/50 border rounded-lg px-3 py-1.5 text-xs focus:ring-2 focus:ring-yellow-500" :class="sch.status === 'active' ? 'border-green-500/50 text-green-400' : 'border-red-500/50 text-red-400'">
                        <option value="active" class="bg-gray-900">Active</option>
                        <option value="inactive" class="bg-gray-900">Inactive</option>
                      </select>
                    </td>
                    <td class="px-6 py-4">
                      <button @click="toggleFeatured(sch.id, sch.featured)" class="text-yellow-500 hover:text-yellow-400 transition-colors p-1 hover:bg-yellow-500/10 rounded-lg">
                        <Star :class="sch.featured ? 'fill-yellow-500' : ''" class="w-5 h-5" />
                      </button>
                    </td>
                    <td class="px-6 py-4">
                      <div class="flex gap-2">
                        <button @click="editScholarship(sch)" class="text-blue-400 hover:text-blue-300 transition-colors p-1 hover:bg-blue-500/10 rounded-lg">
                          <Edit class="w-4 h-4" />
                        </button>
                        <button @click="deleteScholarship(sch.id)" class="text-red-400 hover:text-red-300 transition-colors p-1 hover:bg-red-500/10 rounded-lg">
                          <Trash2 class="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr v-if="allScholarships.length === 0">
                    <td colspan="8" class="px-6 py-12 text-center text-purple-300">
                      <BookOpen class="w-12 h-12 mx-auto mb-3 opacity-50" />
                      <p>No scholarships yet</p>
                      <p class="text-sm mt-1">Click "Add Scholarship" to create your first opportunity</p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
    </main>

    <!-- Message Modal -->
    <Transition name="modal">
      <div v-if="messageModalVisible" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4" @click.self="closeMessageModal">
        <div class="bg-gradient-to-br from-gray-900 to-black rounded-2xl max-w-2xl w-full border border-white/30 shadow-2xl p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-xl font-bold text-white">Message Details</h3>
            <button @click="closeMessageModal" class="text-purple-300 hover:text-white transition">
              <X class="w-5 h-5" />
            </button>
          </div>
          <div class="space-y-4 max-h-[60vh] overflow-y-auto">
            <div class="p-3 bg-white/5 rounded-lg">
              <label class="text-purple-300 text-sm block mb-1">
                <User class="w-3 h-3 inline mr-1" /> Full Name
              </label>
              <p class="text-white font-medium">{{ selectedMessage?.full_name || selectedMessage?.name || 'N/A' }}</p>
            </div>
            <div class="p-3 bg-white/5 rounded-lg">
              <label class="text-purple-300 text-sm block mb-1">
                <Mail class="w-3 h-3 inline mr-1" /> Email Address
              </label>
              <p class="text-white">{{ selectedMessage?.email || 'N/A' }}</p>
            </div>
            <div class="p-3 bg-white/5 rounded-lg">
              <label class="text-purple-300 text-sm block mb-1">
                <Phone class="w-3 h-3 inline mr-1" /> Phone Number
              </label>
              <p class="text-white text-lg font-semibold">
                {{ selectedMessage?.phone || selectedMessage?.phone_number || selectedMessage?.mobile || 'Not provided' }}
              </p>
            </div>
            <div class="p-3 bg-white/5 rounded-lg">
              <label class="text-purple-300 text-sm block mb-1">Subject</label>
              <p class="text-white">{{ selectedMessage?.subject || selectedMessage?.scholarship_title || 'General Inquiry' }}</p>
            </div>
            <div class="p-3 bg-white/5 rounded-lg">
              <label class="text-purple-300 text-sm block mb-1">Message Content</label>
              <div class="text-white whitespace-pre-wrap leading-relaxed max-h-48 overflow-y-auto">
                {{ selectedMessage?.message || 'No message content' }}
              </div>
            </div>
            <div class="p-3 bg-white/5 rounded-lg">
              <label class="text-purple-300 text-sm block mb-1">
                <Calendar class="w-3 h-3 inline mr-1" /> Date Received
              </label>
              <p class="text-white">{{ formatDate(selectedMessage?.created_at, true) }}</p>
            </div>
          </div>
          <div class="mt-6 flex justify-end gap-3">
            <button v-if="selectedMessage?.email" @click="replyToEmail" class="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
              <Mail class="w-4 h-4" /> Reply via Email
            </button>
            <button v-if="selectedMessage?.phone || selectedMessage?.phone_number || selectedMessage?.mobile" @click="callPhone" class="px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition flex items-center gap-2">
              <Phone class="w-4 h-4" /> Call Now
            </button>
            <button @click="closeMessageModal" class="px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-600 transition">Close</button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Scholarship Modal -->
    <Transition name="modal">
      <div v-if="scholarshipModalVisible" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto" @click.self="closeScholarshipModal">
        <div class="bg-gradient-to-br from-gray-900 to-black rounded-2xl max-w-4xl w-full border border-white/30 shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
          <div class="flex justify-between items-center mb-4 sticky top-0 bg-gray-900/95 py-2 -mt-2">
            <h3 class="text-xl font-bold text-white">{{ editingScholarship ? 'Edit Scholarship' : 'Add New Scholarship' }}</h3>
            <button @click="closeScholarshipModal" class="text-purple-300 hover:text-white transition">
              <X class="w-5 h-5" />
            </button>
          </div>
          
          <form @submit.prevent="saveScholarship" class="space-y-4">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm text-purple-300 mb-1">Title *</label>
                <input v-model="scholarshipForm.title" type="text" required class="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500">
              </div>
              <div>
                <label class="block text-sm text-purple-300 mb-1">Country</label>
                <input v-model="scholarshipForm.country" type="text" class="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500">
              </div>
              <div>
                <label class="block text-sm text-purple-300 mb-1">Degree</label>
                <input v-model="scholarshipForm.degree" type="text" class="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500">
              </div>
              <div>
                <label class="block text-sm text-purple-300 mb-1">Deadline</label>
                <input v-model="scholarshipForm.deadline" type="date" class="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500">
              </div>
              <div>
                <label class="block text-sm text-purple-300 mb-1">Application Link</label>
                <input v-model="scholarshipForm.link" type="url" class="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500">
              </div>
              <div>
                <label class="block text-sm text-purple-300 mb-1">Image URL</label>
                <input v-model="scholarshipForm.image_url" type="url" class="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500">
              </div>
              <div>
                <label class="block text-sm text-purple-300 mb-1">Status</label>
                <select v-model="scholarshipForm.status" class="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500">
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div class="flex items-center gap-2 pt-6">
                <input type="checkbox" v-model="scholarshipForm.featured" id="featured" class="w-4 h-4 rounded border-white/20 bg-black/50 focus:ring-yellow-500">
                <label for="featured" class="text-white text-sm">Featured Scholarship</label>
              </div>
            </div>
            
            <div>
              <label class="block text-sm text-purple-300 mb-1">Description *</label>
              <textarea v-model="scholarshipForm.description" rows="4" required class="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500"></textarea>
            </div>
            
            <div>
              <label class="block text-sm text-purple-300 mb-1">Eligibility</label>
              <textarea v-model="scholarshipForm.eligibility" rows="3" class="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500"></textarea>
            </div>
            
            <div>
              <label class="block text-sm text-purple-300 mb-1">Benefits</label>
              <textarea v-model="scholarshipForm.benefits" rows="3" class="w-full bg-black/50 border border-white/20 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-yellow-500"></textarea>
            </div>
            
            <div class="flex justify-end gap-3 pt-4 sticky bottom-0 bg-gray-900/95 py-3 -mb-6">
              <button type="button" @click="closeScholarshipModal" class="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition">Cancel</button>
              <button type="submit" :disabled="saving" class="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-black rounded-lg font-medium flex items-center gap-2 transition shadow-lg disabled:opacity-50">
                <Save class="w-4 h-4" />{{ saving ? 'Saving...' : 'Save Scholarship' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>

    <!-- Toast Notification -->
    <Transition name="toast">
      <div v-if="toastVisible" class="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-gray-900 to-black border border-yellow-500/50 rounded-lg px-4 py-3 shadow-2xl flex items-center gap-3">
        <div v-if="toastType === 'success'" class="w-1 h-full bg-green-500 rounded-full"></div>
        <div v-else-if="toastType === 'error'" class="w-1 h-full bg-red-500 rounded-full"></div>
        <div v-else class="w-1 h-full bg-yellow-500 rounded-full"></div>
        <p class="text-sm text-white">{{ toastMessage }}</p>
        <button @click="toastVisible = false" class="text-gray-400 hover:text-white">
          <X class="w-4 h-4" />
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { 
  Users, MessageSquare, GraduationCap, Clock, CheckCircle, Download, 
  Trash2, Eye, Edit, Plus, Save, X, LogOut, Key, ChevronDown,
  Mail, Phone, MapPin, Calendar, BookOpen, Star, User, AlertCircle
} from 'lucide-vue-next'

const router = useRouter()

// --- Auth ---
const token = localStorage.getItem('adminToken')
if (!token) router.push('/login')

// --- Stats ---
const stats = ref({
  totalContacts: 0,
  totalScholarships: 0,
  totalSubscribers: 0
})

const statCards = computed(() => [
  {
    label: 'Total Contacts',
    value: stats.value.totalContacts,
    icon: MessageSquare,
    sub: 'From contact form'
  },
  {
    label: 'Scholarships',
    value: stats.value.totalScholarships,
    icon: GraduationCap,
    sub: 'Active opportunities'
  },
  {
    label: 'Subscribers',
    value: stats.value.totalSubscribers,
    icon: Users,
    sub: 'Newsletter subscribers'
  }
])

// --- Logout ---
const logout = () => {
  localStorage.removeItem('adminToken')
  router.push('/login')
}

// --- Fetch Stats from Backend ---
const fetchStats = async () => {
  try {
    const response = await axios.get('https://newbackend-gamma.vercel.app/api/admin/stats', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (response.data.success) {
      stats.value = response.data.data
    }
  } catch (error) {
    console.error('Failed to fetch stats:', error)
  }
}

// --- Tab state ---
const activeTab = ref('subscribers')
const loading = ref(false)

// --- Dummy data for tables (replace with API calls) ---
const subscribers = ref([])
const contacts = ref([])
const inquiries = ref([])
const allScholarships = ref([])

const tabs = computed(() => [
  { id: 'subscribers', name: 'Subscribers', icon: Users, count: subscribers.value.length },
  { id: 'contacts', name: 'Contacts', icon: MessageSquare, count: contacts.value.length },
  { id: 'inquiries', name: 'Inquiries', icon: Clock, count: inquiries.value.length },
  { id: 'scholarships', name: 'Scholarships', icon: GraduationCap, count: allScholarships.value.length }
])

// --- Settings ---
const showSettings = ref(false)
const toggleSettings = () => { showSettings.value = !showSettings.value }

const passwordForm = ref({ currentPassword: '', newPassword: '', confirmPassword: '' })
const passwordMessage = ref('')
const passwordMessageType = ref('success')

const usernameForm = ref({ newUsername: '', currentPassword: '' })
const usernameMessage = ref('')
const usernameMessageType = ref('success')
const adminUsername = ref('hakizimana')

// --- Modal states ---
const messageModalVisible = ref(false)
const selectedMessage = ref(null)
const scholarshipModalVisible = ref(false)
const editingScholarship = ref(null)
const saving = ref(false)

const scholarshipForm = ref({
  title: '', country: '', degree: '', deadline: '', link: '', image_url: '',
  status: 'active', featured: false, description: '', eligibility: '', benefits: ''
})

// --- Toast ---
const toastVisible = ref(false)
const toastMessage = ref('')
const toastType = ref('success')

// --- Helper functions ---
const formatDate = (dateStr, withTime = false) => {
  if (!dateStr) return 'N/A'
  const d = new Date(dateStr)
  if (isNaN(d)) return 'N/A'
  return d.toLocaleDateString() + (withTime ? ' ' + d.toLocaleTimeString() : '')
}

const showToast = (message, type = 'success') => {
  toastMessage.value = message
  toastType.value = type
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 4000)
}

// --- Dummy method stubs (replace with real API calls) ---
const deleteSubscriber = (id) => { showToast('Subscriber deleted', 'success') }
const deleteContact = (id) => { showToast('Contact deleted', 'success') }
const deleteInquiry = (id) => { showToast('Inquiry deleted', 'success') }
const deleteScholarship = (id) => { showToast('Scholarship deleted', 'success') }
const toggleFeatured = (id, featured) => { showToast(`Featured toggled to ${!featured}`, 'success') }
const updateScholarshipStatus = (id, status) => { showToast(`Status updated to ${status}`, 'success') }
const updateInquiryStatus = (id, status) => { showToast(`Inquiry status updated to ${status}`, 'success') }
const exportData = (type) => { showToast(`Exported ${type}`, 'success') }
const exportScholarships = () => { showToast('Scholarships exported', 'success') }
const viewMessage = (msg) => { selectedMessage.value = msg; messageModalVisible.value = true }
const viewInquiry = (inq) => { selectedMessage.value = inq; messageModalVisible.value = true }
const closeMessageModal = () => { messageModalVisible.value = false; selectedMessage.value = null }
const replyToEmail = () => { window.location.href = `mailto:${selectedMessage.value.email}` }
const callPhone = () => { window.location.href = `tel:${selectedMessage.value.phone || selectedMessage.value.phone_number || selectedMessage.value.mobile}` }
const openScholarshipModal = () => { editingScholarship.value = null; scholarshipForm.value = { title: '', country: '', degree: '', deadline: '', link: '', image_url: '', status: 'active', featured: false, description: '', eligibility: '', benefits: '' }; scholarshipModalVisible.value = true }
const editScholarship = (sch) => { editingScholarship.value = sch; scholarshipForm.value = { ...sch }; scholarshipModalVisible.value = true }
const closeScholarshipModal = () => { scholarshipModalVisible.value = false; editingScholarship.value = null }
const saveScholarship = async () => {
  saving.value = true
  try {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    showToast(editingScholarship.value ? 'Scholarship updated' : 'Scholarship added', 'success')
    scholarshipModalVisible.value = false
  } catch (error) {
    showToast('Error saving scholarship', 'error')
  } finally {
    saving.value = false
  }
}

const changeAdminPassword = () => {
  // Simulate password change
  showToast('Password updated successfully (demo)', 'success')
}

const changeAdminUsername = () => {
  // Simulate username change
  adminUsername.value = usernameForm.value.newUsername || adminUsername.value
  showToast('Username updated successfully (demo)', 'success')
}

// --- Lifecycle ---
onMounted(() => {
  fetchStats()
  // Load other data here (subscribers, contacts, etc.)
})
</script>


<style scoped>
.animate-spin { animation: spin 1s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.modal-enter-active, .modal-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
.toast-enter-active, .toast-leave-active {
  transition: all 0.3s ease;
}
.toast-enter-from, .toast-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.line-clamp-1 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}
</style>
