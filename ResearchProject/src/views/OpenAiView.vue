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
  const puppetCode = `this.puppet('#rightArm', translatXValues, rotateValues);
      this.puppet('#leftArm', translatXValues, rotateValues);
      this.puppet('#leftLeg', translatXValues, rotateValues);
      this.puppet('#rightLeg', translatXValues, rotateValues);
      this.puppet('#body', translatXValues, rotateValues);
      this.puppet('#head', translatXValues, rotateValues);`;

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
        const question = `Return this ${puppetCode} but change the values so that my puppet ${this.question}. My puppet function looks like this ${animeCode}`;
  
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
  