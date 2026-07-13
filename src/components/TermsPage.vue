<template>
  <div class="min-h-screen bg-gray-50">
    <AppHeader />
    
    <!-- Terms Hero Section -->
    <section class="relative h-[500px] md:h-[350px] -mt-20 overflow-hidden">
      <!-- Background Image -->
      <div class="absolute inset-0">
        <div 
          v-motion
          :initial="{ scale: 1.1 }"
          :enter="{ scale: 1, transition: { duration: 8000, type: 'tween', ease: 'easeOut' } }"
          class="absolute inset-0 bg-cover bg-center bg-no-repeat" 
          style="background-image: url('https://i.postimg.cc/rm0MyKch/img10.avif')"
        >
          <div class="absolute inset-0 bg-gradient-to-r from-purple-900/60 to-black/70"></div>
        </div>
      </div>
      
      <div class="relative z-10 h-full flex items-center justify-center text-white">
        <div class="container mx-auto px-4 text-center">
          <h1 
            v-motion
            :initial="{ opacity: 0, y: -50 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 800, type: 'spring', stiffness: 100 } }"
            class="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4"
          >
            Terms of Service
          </h1>
          <p 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 800 } }"
            class="text-lg md:text-xl max-w-2xl mx-auto opacity-95"
          >
            Please read these terms carefully before using our services
          </p>
        </div>
      </div>
    </section>
    
    <!-- Terms Content Section -->
    <section class="py-16 md:py-20">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          
          <!-- Last Updated with dynamic API data -->
          <div 
            v-motion
            :initial="{ opacity: 0, x: -30 }"
            :enter="{ opacity: 1, x: 0, transition: { delay: 200, duration: 500, type: 'spring' } }"
            class="bg-purple-50 border-l-4 border-purple-600 p-4 mb-8 rounded-r-lg hover:shadow-md transition-shadow"
          >
            <div class="flex items-start gap-2 text-gray-700">
              <Calendar class="w-5 h-5 mt-0.5 text-purple-600 flex-shrink-0" />
              <div>
                <strong>Last Updated:</strong> 
                <span v-if="lastUpdatedLoading" class="inline-flex items-center gap-1">
                  <span class="w-4 h-4 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></span> Loading...
                </span>
                <span v-else-if="lastUpdatedError" class="text-red-600">
                  {{ fallbackLastUpdated }} (using fallback)
                </span>
                <span v-else>{{ lastUpdatedDate }}</span>
              </div>
            </div>
          </div>
          
          <!-- Agreement to Terms -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 300, duration: 600, type: 'spring' } }"
            class="mb-10 group"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              1. Agreement to Terms
            </h2>
            <p class="text-gray-600 leading-relaxed mb-3">
              By accessing or using the GoAbroad Admissions website, services, or any related applications (collectively, the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these terms, you may not access the Service.
            </p>
            <p class="text-gray-600 leading-relaxed">
              These Terms apply to all visitors, users, and others who access or use the Service. We reserve the right to update or modify these Terms at any time without prior notice. Your continued use of the Service after any changes constitutes acceptance of the new Terms.
            </p>
          </div>
          
          <!-- Eligibility -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 350, duration: 600, type: 'spring' } }"
            class="mb-10 group"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              2. Eligibility
            </h2>
            <p class="text-gray-600 leading-relaxed mb-3">
              By using our Service, you represent and warrant that:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li class="hover:translate-x-1 transition-transform duration-200">You are at least 13 years of age (or the age of legal majority in your jurisdiction)</li>
              <li class="hover:translate-x-1 transition-transform duration-200">You have the legal capacity to enter into these Terms</li>
              <li class="hover:translate-x-1 transition-transform duration-200">You will not use the Service for any illegal or unauthorized purpose</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Your use of the Service does not violate any applicable law or regulation</li>
            </ul>
            <p class="text-gray-600 leading-relaxed mt-3">
              If you are using the Service on behalf of an organization, you represent that you have the authority to bind that organization to these Terms.
            </p>
          </div>
          
          <!-- Services Provided -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 400, duration: 600, type: 'spring' } }"
            class="mb-10 group"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              3. Services Provided
            </h2>
            <p class="text-gray-600 leading-relaxed mb-3">
              GoAbroad Admissions provides educational consulting services including but not limited to:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li class="hover:translate-x-1 transition-transform duration-200">Study abroad program information and guidance</li>
              <li class="hover:translate-x-1 transition-transform duration-200">University application assistance</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Scholarship identification and application support</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Visa application guidance</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Pre-departure orientation and support</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Educational counseling and career advice</li>
            </ul>
            <p class="text-gray-600 leading-relaxed mt-3">
              We reserve the right to modify, suspend, or discontinue any part of our services at any time without notice.
            </p>
          </div>
          
          <!-- User Responsibilities -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 450, duration: 600, type: 'spring' } }"
            class="mb-10 group"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              4. User Responsibilities
            </h2>
            <p class="text-gray-600 leading-relaxed mb-3">
              As a user of our Service, you agree to:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li class="hover:translate-x-1 transition-transform duration-200">Provide accurate, current, and complete information when using our services</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Maintain the security and confidentiality of your account credentials</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Notify us immediately of any unauthorized use of your account</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Take responsibility for all activities that occur under your account</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Comply with all applicable laws and regulations</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Not interfere with or disrupt the integrity of our Service</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Not attempt to gain unauthorized access to any part of the Service</li>
            </ul>
          </div>
          
          <!-- Application Process -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 500, duration: 600, type: 'spring' } }"
            class="mb-10 group"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              5. University Applications & Scholarships
            </h2>
            <p class="text-gray-600 leading-relaxed mb-3">
              While we provide guidance and support throughout the application process, please note:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li class="hover:translate-x-1 transition-transform duration-200">Final admission decisions are made solely by universities and scholarship committees</li>
              <li class="hover:translate-x-1 transition-transform duration-200">We do not guarantee admission to any educational institution</li>
              <li class="hover:translate-x-1 transition-transform duration-200">We do not guarantee approval of any scholarship application</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Application fees, tuition, and other costs are your responsibility</li>
              <li class="hover:translate-x-1 transition-transform duration-200">You are responsible for meeting all deadlines and requirements</li>
              <li class="hover:translate-x-1 transition-transform duration-200">We are not liable for changes in university policies or requirements</li>
            </ul>
          </div>
          
          <!-- Fees and Payments -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 550, duration: 600, type: 'spring' } }"
            class="mb-10 group"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              6. Fees and Payments
            </h2>
            <p class="text-gray-600 leading-relaxed mb-3">
              Our service fees are structured as follows:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li class="hover:translate-x-1 transition-transform duration-200">Initial consultations are provided free of charge</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Premium consulting packages have clearly stated fees</li>
              <li class="hover:translate-x-1 transition-transform duration-200">All fees are non-refundable unless otherwise stated</li>
              <li class="hover:translate-x-1 transition-transform duration-200">We reserve the right to change our fee structure with prior notice</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Third-party fees (application fees, test fees, etc.) are your responsibility</li>
            </ul>
          </div>
          
          <!-- Intellectual Property -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 600, duration: 600, type: 'spring' } }"
            class="mb-10 group"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              7. Intellectual Property
            </h2>
            <p class="text-gray-600 leading-relaxed mb-3">
              The Service and its original content, features, and functionality are owned by GoAbroad Admissions and are protected by international copyright, trademark, patent, trade secret, and other intellectual property laws.
            </p>
            <p class="text-gray-600 leading-relaxed mb-3">
              You may not:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li class="hover:translate-x-1 transition-transform duration-200">Copy, modify, or distribute our content without permission</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Use our trademarks or logos without prior written consent</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Reverse engineer any part of our Service</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Remove any copyright or proprietary notices</li>
            </ul>
          </div>
          
          <!-- User Content -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 650, duration: 600, type: 'spring' } }"
            class="mb-10 group"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              8. User Content
            </h2>
            <p class="text-gray-600 leading-relaxed mb-3">
              By submitting content (including application materials, messages, or feedback) to us, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, and modify such content solely for the purpose of providing our services to you.
            </p>
            <p class="text-gray-600 leading-relaxed">
              You represent and warrant that you own or have the necessary rights to all content you submit, and that such content does not violate any third-party rights or applicable laws.
            </p>
          </div>
          
          <!-- Privacy -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 700, duration: 600, type: 'spring' } }"
            class="mb-10 group"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              9. Privacy
            </h2>
            <p class="text-gray-600 leading-relaxed">
              Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices regarding the collection and use of your personal information.
            </p>
          </div>
          
          <!-- Limitation of Liability -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 750, duration: 600, type: 'spring' } }"
            class="mb-10 group"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              10. Limitation of Liability
            </h2>
            <p class="text-gray-600 leading-relaxed mb-3">
              To the maximum extent permitted by law, GoAbroad Admissions shall not be liable for:
            </p>
            <ul class="list-disc list-inside text-gray-600 space-y-2 ml-4">
              <li class="hover:translate-x-1 transition-transform duration-200">Any indirect, incidental, special, consequential, or punitive damages</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Loss of profits, data, or business opportunities</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Damages resulting from your use or inability to use the Service</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Any unauthorized access to or use of our secure servers</li>
              <li class="hover:translate-x-1 transition-transform duration-200">Any bugs, viruses, or other harmful code</li>
            </ul>
            <p class="text-gray-600 leading-relaxed mt-3">
              Our total liability for any claim arising out of these Terms shall not exceed the amount you paid us, if any, for the services giving rise to the claim.
            </p>
          </div>
          
          <!-- Disclaimer of Warranties -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 800, duration: 600, type: 'spring' } }"
            class="mb-10 group"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              11. Disclaimer of Warranties
            </h2>
            <p class="text-gray-600 leading-relaxed">
              THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. TO THE FULLEST EXTENT PERMITTED BY LAW, WE DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
            </p>
          </div>
          
          <!-- Indemnification -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 850, duration: 600, type: 'spring' } }"
            class="mb-10 group"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              12. Indemnification
            </h2>
            <p class="text-gray-600 leading-relaxed">
              You agree to indemnify, defend, and hold harmless GoAbroad Admissions and its officers, directors, employees, agents, and affiliates from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or related to your use of the Service, violation of these Terms, or violation of any rights of another.
            </p>
          </div>
          
          <!-- Third-Party Links -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 900, duration: 600, type: 'spring' } }"
            class="mb-10 group"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              13. Third-Party Links
            </h2>
            <p class="text-gray-600 leading-relaxed">
              Our Service may contain links to third-party websites or services that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites. You acknowledge and agree that we shall not be responsible or liable for any damage or loss caused by or in connection with the use of such third-party websites.
            </p>
          </div>
          
          <!-- Termination -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 950, duration: 600, type: 'spring' } }"
            class="mb-10 group"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              14. Termination
            </h2>
            <p class="text-gray-600 leading-relaxed mb-3">
              We may terminate or suspend your access to the Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
            </p>
            <p class="text-gray-600 leading-relaxed">
              Upon termination, your right to use the Service will cease immediately. All provisions of these Terms which by their nature should survive termination shall survive, including ownership provisions, warranty disclaimers, indemnity, and limitations of liability.
            </p>
          </div>
          
          <!-- Governing Law -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 1000, duration: 600, type: 'spring' } }"
            class="mb-10 group"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              15. Governing Law
            </h2>
            <p class="text-gray-600 leading-relaxed">
              These Terms shall be governed and construed in accordance with the laws of Rwanda, without regard to its conflict of law provisions. Any legal action or proceeding arising out of or relating to these Terms shall be brought exclusively in the courts of Kigali, Rwanda.
            </p>
          </div>
          
          <!-- Dispute Resolution -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 1050, duration: 600, type: 'spring' } }"
            class="mb-10 group"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              16. Dispute Resolution
            </h2>
            <p class="text-gray-600 leading-relaxed mb-3">
              Any dispute arising from or relating to these Terms or the Service shall first be attempted to be resolved through informal negotiation. If the dispute cannot be resolved through negotiation, it shall be submitted to binding arbitration in Kigali, Rwanda, in accordance with the rules of the Rwanda Arbitration Centre.
            </p>
          </div>
          
          <!-- Severability -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 1100, duration: 600, type: 'spring' } }"
            class="mb-10 group"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              17. Severability
            </h2>
            <p class="text-gray-600 leading-relaxed">
              If any provision of these Terms is held to be unenforceable or invalid, such provision shall be changed and interpreted to accomplish the objectives of such provision to the greatest extent possible under applicable law, and the remaining provisions shall continue in full force and effect.
            </p>
          </div>
          
          <!-- Entire Agreement -->
          <div 
            v-motion
            :initial="{ opacity: 0, y: 30 }"
            :enter="{ opacity: 1, y: 0, transition: { delay: 1150, duration: 600, type: 'spring' } }"
            class="mb-10 group"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
              18. Entire Agreement
            </h2>
            <p class="text-gray-600 leading-relaxed">
              These Terms, together with our Privacy Policy, constitute the entire agreement between you and GoAbroad Admissions regarding the use of the Service, superseding any prior agreements between you and us.
            </p>
          </div>
          
          <!-- Contact Information with dynamic API data -->
          <div 
            v-motion
            :initial="{ opacity: 0, scale: 0.95 }"
            :enter="{ opacity: 1, scale: 1, transition: { delay: 1200, duration: 600, type: 'spring', stiffness: 100 } }"
            class="bg-gray-100 rounded-xl p-6 md:p-8 mb-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <h2 class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
            <p class="text-gray-600 leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
            </p>
            <div class="space-y-2">
              <div class="flex items-center gap-2 text-gray-700 hover:translate-x-2 transition-transform duration-200">
                <Mail class="w-5 h-5 text-purple-600 flex-shrink-0" />
                <div>
                  <strong>Email:</strong> 
                  <span v-if="contactLoading">Loading...</span>
                  <span v-else-if="contactError">{{ fallbackContact.email }} (using fallback)</span>
                  <span v-else>
                    <a :href="`mailto:${contactInfo.email}`" class="text-purple-600 hover:text-purple-700 hover:underline transition-all">{{ contactInfo.email }}</a>
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-2 text-gray-700 hover:translate-x-2 transition-transform duration-200">
                <Phone class="w-5 h-5 text-purple-600 flex-shrink-0" />
                <div>
                  <strong>Phone:</strong> 
                  <span v-if="contactLoading">Loading...</span>
                  <span v-else-if="contactError">{{ fallbackContact.phone }} (using fallback)</span>
                  <span v-else>
                    <a :href="`tel:${contactInfo.phone}`" class="text-purple-600 hover:text-purple-700 hover:underline transition-all">{{ contactInfo.phone }}</a>
                  </span>
                </div>
              </div>
              <div class="flex items-center gap-2 text-gray-700 hover:translate-x-2 transition-transform duration-200">
                <MapPin class="w-5 h-5 text-purple-600 flex-shrink-0" />
                <div>
                  <strong>Address:</strong> 
                  <span v-if="contactLoading">Loading...</span>
                  <span v-else-if="contactError">{{ fallbackContact.address }} (using fallback)</span>
                  <span v-else>{{ contactInfo.address }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Acknowledgment with Lucide icon -->
          <div 
            v-motion
            :initial="{ opacity: 0, scale: 0.95 }"
            :enter="{ opacity: 1, scale: 1, transition: { delay: 1300, duration: 600, type: 'spring', stiffness: 100 } }"
            :while-hover="{ scale: 1.02, transition: { duration: 200 } }"
            class="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-6 text-center cursor-pointer hover:shadow-lg transition-all duration-300"
          >
            <FileText class="w-8 h-8 mx-auto mb-3 text-purple-600" />
            <p class="text-gray-700 font-medium">
              By using our Service, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            </p>
          </div>
          
        </div>
      </div>
    </section>
    
    <!-- Footer CTA Section -->
    <section class="py-16 bg-gradient-to-r from-purple-600 to-purple-800 text-white overflow-hidden">
      <div class="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        <div 
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0, transition: { delay: 200, duration: 800, type: 'spring' } }"
        >
          <h2 class="text-3xl md:text-4xl font-bold mb-4">Need Clarification?</h2>
          <p class="text-lg mb-8 opacity-95">If you have any questions about our Terms of Service, please reach out to us.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link 
              to="/contact" 
              class="group inline-flex items-center justify-center px-6 py-3 bg-white text-purple-600 rounded-lg font-semibold hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <Mail class="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
              Contact Us
            </router-link>
            <a 
              href="tel:+250789410951" 
              class="group inline-flex items-center justify-center px-6 py-3 bg-transparent border-2 border-white rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300 hover:-translate-y-1"
            >
              <Phone class="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
              Call Now
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Calendar, Mail, Phone, MapPin, FileText } from 'lucide-vue-next'
import AppHeader from './AppHeader.vue'

// State for last updated date
const lastUpdatedDate = ref('')
const lastUpdatedLoading = ref(true)
const lastUpdatedError = ref(false)
const fallbackLastUpdated = 'January 15, 2025'

// State for contact info
const contactInfo = ref({
  email: '',
  phone: '',
  address: ''
})
const contactLoading = ref(true)
const contactError = ref(false)
const fallbackContact = {
  email: 'goabroadadmissions@outlook.com',
  phone: '+250 789 410 951',
  address: 'Kigali, Rwanda'
}

// API call to fetch last updated date
async function fetchLastUpdated() {
  try {
    // Replace with your actual API endpoint
    // Example: const response = await fetch('https://api.yourservice.com/terms/last-updated')
    // For demonstration, we're using a mock API endpoint that returns a JSON object
    // In production, replace with your real backend endpoint
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1')
    if (!response.ok) throw new Error('Failed to fetch')
    
    const data = await response.json()
    // Mock: Use the id or title to simulate a last updated date
    // In a real API, your endpoint would return { lastUpdated: "January 15, 2025" }
    // For demo purposes we're returning a dynamic date string
    // IMPORTANT: Replace with actual API response structure
    lastUpdatedDate.value = 'January 15, 2025' // Example static response from API
    lastUpdatedError.value = false
  } catch (error) {
    console.error('Error fetching last updated date:', error)
    lastUpdatedError.value = true
    lastUpdatedDate.value = fallbackLastUpdated
  } finally {
    lastUpdatedLoading.value = false
  }
}

// API call to fetch contact information
async function fetchContactInfo() {
  try {
    // Replace with your actual API endpoint for contact information
    // Example: const response = await fetch('https://api.yourservice.com/contact-info')
    const response = await fetch('https://jsonplaceholder.typicode.com/users/1')
    if (!response.ok) throw new Error('Failed to fetch contact info')
    
    const data = await response.json()
    // Mock mapping - in a real API, adjust according to your response structure
    // For demo purposes, we're using static values that match the original
    contactInfo.value = {
      email: 'goabroadadmissions@outlook.com',
      phone: '+250 789 410 951',
      address: 'Kigali, Rwanda'
    }
    contactError.value = false
  } catch (error) {
    console.error('Error fetching contact info:', error)
    contactError.value = true
    contactInfo.value = { ...fallbackContact }
  } finally {
    contactLoading.value = false
  }
}

onMounted(() => {
  // Call both APIs when component mounts
  fetchLastUpdated()
  fetchContactInfo()
})
</script>

<style scoped>
/* Smooth animations */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}

/* Custom styling for list items */
.list-disc li {
  margin-bottom: 0.5rem;
  transition: all 0.2s ease;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
}

/* Link hover effects */
a:not(.router-link-active):hover {
  transition: all 0.3s ease;
}

/* Section spacing improvements */
section {
  position: relative;
}

/* Better readability for text */
.text-gray-600 {
  line-height: 1.75;
}

/* Hover effects for cards */
.bg-gray-100, .bg-purple-50, .bg-purple-100 {
  transition: all 0.3s ease;
}

/* Gradient text effect */
.bg-gradient-to-r {
  background-size: 200% auto;
  transition: all 0.3s ease;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c084fc;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a855f7;
}
</style>
