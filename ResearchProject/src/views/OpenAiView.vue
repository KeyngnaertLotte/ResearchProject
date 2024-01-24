<template>
    <div class="flex justify-center items-center h-full">
      <div class="flex flex-col  items-center h-2/5 p-4 rounded-2xl bg-[#DE2A21] w-4/5">
        <h2 class="text-white font-bold text-4xl">Let's make Micky move!</h2>
      <div class="flex flex-col justify-around w-3/5 h-full" v-if="!loading">
        <div class="w-full flex flex-col" >
          <label for="question" class="text-white font-semibold my-2">What do you want him to do? </label>
        <input
          type="text"
          id="question"
          class="p-2 rounded-2xl"
          v-model="question"
          placeholder="Enter your question"
          required
        />
        </div>
      <button @click="sendQuestion" class="btn btn-primary bg-white rounded-lg p-1" > SEND QUESTION</button>
      </div>
      <div class="w-full h-full flex items-center justify-center" v-if="loading">
        <Loader/>
       </div>
      </div>
    </div>
  </template>
  
  <script>
  import OpenAI from "openai";
  import Loader from "@/components/Loader.vue"
  const openai = new OpenAI({
    apiKey: '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',
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
  
  export default {
    components:{ Loader},
    data() {
      return {
        question: "",
        response: null,
        loading: false,
      };
    },
    methods: {
      async sendQuestion() {
        this.loading = true
        const question = `${puppetCode} only change the values of this code so that my puppet ${this.question}. My puppet function looks like this ${animeCode}. `;
        
        try {
          const completion = await openai.chat.completions.create({
            messages: [
              {
                role: "system",
                content: `You are a helpful assistant to animate with animejs designed to only change the values in following code format ${puppetCode} and return only code`,
              },
              { role: "user", content: question },
            ],
            model: "gpt-3.5-turbo-1106",
          });
  
          // console.log(completion.choices[0].message.content);
          if (completion.choices[0].message.content) this.emitter.emit('openai', `${completion.choices[0].message.content}`)
          

        } catch (error) {
          console.error(error);
        } finally {
          this.loading = false
        }
      },
    },
  };
  </script>
  
