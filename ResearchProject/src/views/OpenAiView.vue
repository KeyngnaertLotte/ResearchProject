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
      <button @click="sendQuestion" class="btn btn-primary bg-white" :disabled="loading">
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
    data() {
      return {
        question: "",
        response: null,
        loading: false,
      };
    },
    methods: {
      async sendQuestion() {
        const question = `${puppetCode} Change the values of this code so that my puppet ${this.question}. My puppet function looks like this ${animeCode}. `;
  
        try {
          const completion = await openai.chat.completions.create({
            messages: [
              {
                role: "system",
                content: `You are a helpful assistant designed to only output code in following format ${puppetCode}`,
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
  