<template>
    <div class="container">
      <h2 class="text-white">AnimeJS Questions</h2>
      <div class="form-group">
        <label for="question" class="text-white">Question:</label>
        <input
          type="text"
          id="question"
          class="form-control"
          v-model="question"
          placeholder="Enter your question"
        />
      </div>
      <button @click="sendQuestion" class="btn btn-primary" :disabled="loading">
        {{ loading ? 'Sending Question...' : 'Send Question' }}
      </button>
    </div>
  </template>
  
  <script>
  import OpenAI from "openai";
  const openai = new OpenAI({
    apiKey: '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',
    dangerouslyAllowBrowser: true,
  });
  const puppetCode = `
  import MickyMouse from './MickyMouse.vue';
  import anime from 'animejs';
  const duration = 1000;
  
  // Define the initial and final rotation angles for the waving motion
  const initialRotationRA = 0;
  const finalRotationRA = 0; // Adjust the desired rotation angle
  
  const initialRotationLA = 0;
  const finalRotationLA = 0;
  
  const initialRotationLL = 0;
  const finalRotationLL = 0;
  
  const initialRotationRL = 0;
  const finalRotationRL = 0;
  
  const initialRotationB = 0;
  const finalRotationB = 0;
  
  const initialRotationH = 0;
  const finalRotationH = 0;
  
  export default {
    mounted() {
      this.rightArm();
      this.leftArm();
      this.rightLeg();
      this.leftLeg();
      this.body();
      this.head();
    },
    components: {
      MickyMouse,
    },
    methods: {
      rightArm(){
        anime({
          targets: '#rightArm',
          rotate: [initialRotationRA, finalRotationRA],
          easing: 'easeInOutQuad',
          duration,
          loop: true,
          direction: 'alternate',
          transformOrigin: '100 100',
        });
      },
      leftArm(){
        anime({
          targets: '#leftArm',
          rotate: [initialRotationLA, finalRotationLA],
          easing: 'easeInOutQuad',
          duration,
          loop: true,
          direction: 'alternate',
          transformOrigin: '100 100',
        });
      },
      leftLeg(){
        anime({
          targets: '#leftLeg',
          rotate: [initialRotationLL, finalRotationLL],
          easing: 'easeInOutQuad',
          duration,
          loop: true,
          direction: 'alternate',
          transformOrigin: '100 100',
        });
      },
      rightLeg(){
        anime({
          targets: '#rightLeg',
          rotate: [initialRotationRL, finalRotationRL],
          easing: 'easeInOutQuad',
          duration,
          loop: true,
          direction: 'alternate',
          transformOrigin: '100 100',
        });
      },
      body(){
        anime({
          targets: '#body',
          rotate: [initialRotationB, finalRotationB],
          easing: 'easeInOutQuad',
          duration,
          loop: true,
          direction: 'alternate',
          transformOrigin: '100 100',
        });
      },
      head(){
        anime({
          targets: '#head',
          rotate: [initialRotationH, finalRotationH],
          easing: 'easeInOutQuad',
          duration,
          loop: true,
          direction: 'alternate',
          transformOrigin: '100 100',
        });
      },
      }
  };`;
  
  export default {
    data() {
      return {
        question: "",
        response: null,
        loading: false,
      };
    },
    methods: {
      async sendQuestion() {
        const question = `Change this code ${puppetCode} so it looks like my puppet is ${this.question} show vue 3 code`;
  
        try {
          const completion = await openai.chat.completions.create({
            messages: [
              {
                role: "system",
                content: "You are a helpful assistant designed to output JSON.",
              },
              { role: "user", content: question },
            ],
            model: "gpt-3.5-turbo-1106",
          });
  
          // console.log(completion.choices[0].message.content);
          if (completion.choices[0].message.content) this.emitter.emit('openai', `${completion.choices[0].message.content}`)
          

        } catch (error) {
          console.error(error);
        } 
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    background-color: #121212;
    padding: 20px;
    border-radius: 10px;
    width: 100%;
    height: 50%;
  }
  .form-group label {
    margin-bottom: 10px;
  }
  .form-control {
    margin-bottom: 20px;
  }
  </style>
  