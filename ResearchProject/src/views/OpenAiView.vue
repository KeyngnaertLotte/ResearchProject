<template>
  <div class="flex justify-center items-center h-full">
    <div class="flex flex-col items-center h-[70%] p-4 rounded-2xl bg-[#DE2A21] w-4/5">
      <h2 class="text-white font-bold xl:text-4xl text-3xl">Let's make Micky move!</h2>
      <div class="flex flex-col justify-around xl:w-3/5 w-4/5 h-full" v-if="!loading">
        <div class="w-full flex flex-col">
          <label for="question" class="text-white font-semibold my-4 text-justify flex flex-col items-center justify-center text-lg">
            What do you want him to do?
            <p class="font-normal text-sm opacity-90">Be as specific as possible. For example: "turn his head left to right", "turn right leg 90 degrees to the right and the left leg 90 degrees to the left"</p>
          </label>

          <textarea
            id="question"
            class="p-2 rounded-2xl resize-none"
            :class="validation ? 'border-4 border-red-950' : 'border-none'"
            v-model="question"
            placeholder="Enter your movement"
            required
          />
          <p v-if="validation" class="text-red-950 mt-2">Please enter a movement.</p>
        </div>
        <button @click="sendQuestion" class="hover:font-bold hover:shadow hover:shadow-black  focus:xl:text-lg focus:text-xl focus:font-bold focus:text-[#DE2A21] btn btn-primary bg-white rounded-lg p-1 text-[#DE2A21]"> SEND QUESTION</button>
      </div>
      <div class="w-full h-full flex items-center justify-center" v-if="loading">
        <Loader />
      </div>
    </div>
  </div>
</template>

<script>
import OpenAI from "openai";
import Loader from "@/components/Loader.vue";
import { ref } from "vue";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_API_KEY,
  dangerouslyAllowBrowser: true,
});
const puppetCode = `this.puppet('#rightArm', [0, 0], [0, 0]);
  this.puppet('#leftArm', [0, 0], [0, 0]);
  this.puppet('#leftLeg', [0, 0], [0, 0]);
  this.puppet('#rightLeg', [0, 0], [0, 0]);
  this.puppet('#body', [0, 0], [0, 0]);
  this.puppet('#head', [0, 0], [0, 0]);`;

const animeCode = `puppet(target, translatXValues, rotateValues){
    anime({
      targets: target,
      rotate: rotateValues,
      translateX: translatXValues,
      easing: 'easeInOutQuad',
      duration,
      loop: true,
      direction: 'alternate',
      transformOrigin: '100 100',
    });
  },`;

  const validation = ref(false)

export default {
  components: { Loader },
  data() {
    return {
      question: "",
      response: null,
      loading: false,
      validation,
    };
  },
  methods: {
    async sendQuestion() {
      this.loading = true;
      if (!this.question.trim()) {
        validation.value = true
        this.loading = false;

        return;
      } else {
        validation.value = false
        try {
          const question = `${puppetCode} only change the values of this code so that my puppet ${this.question}. My puppet function looks like this ${animeCode}. `;
          const completion = await openai.chat.completions.create({
            messages: [
              {
                role: "system",
                content: `You are a helpful assistant to animate with animejs designed to only change the values in the following code format ${puppetCode} and return only code`,
              },
              { role: "user", content: question },
            ],
            model: "gpt-3.5-turbo-1106",
          });

          if (completion.choices[0].message.content) this.emitter.emit('openai', `${completion.choices[0].message.content}`);
        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false;
        }
      }
    },
  },
};
</script>
