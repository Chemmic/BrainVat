import droneImage from "@/assets/drone.svg";
import plant_ill from "@/assets/plant_ill.svg";
import text_to_speech from "@/assets/text-to-speech.svg";
import gaming from "@/assets/gaming.svg";
import droneImagebanner from "@/assets/drone.svg";
export const allJobs = [
  { id: 0, title: 'Autonomous Combat Drone Simulation', imageUrl: droneImage, bannerUrl:droneImagebanner ,description: 'Help train next-gen autonomous drones for tactical recognition and decision-making in high-risk conflict zones.', tags: ['AI', 'Military', 'Simulation'], price: '900$ per hour', featured: true },
  { id: 1, title: 'Plant Disease Recognition', imageUrl: plant_ill, description: 'The Tom Nook Institute is currently looking to develop a new AI model for recognizing plant diseases via satellite images.', tags: ['Biology', 'Nature'], price: '45$ per job' },
  { id: 2, title: 'Speech-to-Text Optimization', imageUrl: text_to_speech, description: 'We are improving real-time voice transcription for noisy environments using deep learning models.', tags: ['AI', 'Voice'], price: '60$ per task' },
  { id: 3, title: 'Gaming Bot Evaluation', imageUrl: gaming, description: 'Test NPC AI in an open-world simulation game.', tags: ['Gaming', 'AI Testing'], price: '50$ per hour' },
  { id: 4, title: 'Sentiment Annotation', imageUrl: null, description: 'Label sentiment in social media content.', tags: ['NLP', 'Annotation'], price: '30$ per batch' },
  { id: 5, title: 'Multilingual Chatbot Training', imageUrl: null, description: 'Train chatbots in various languages.', tags: ['Languages', 'Chatbots'], price: '75$ per session' },
  { id: 6, title: '3D Object Recognition', imageUrl: null, description: 'Label point clouds for robotics.', tags: ['Computer Vision', '3D'], price: '80$ per job' },
  {
    id: 7,
    title: 'Facial Emotion Detection Calibration',
    imageUrl: null,
    description: 'Assist in calibrating AI systems designed to detect subtle human facial expressions, including micro-expressions that occur in less than a second. Your neural activity helps fine-tune emotional recognition models used in robotics, lie detection, and affective computing interfaces.',
    tags: ['AI', 'Psychology'],
    price: '70$ per session'
  },
  {
    id: 8,
    title: 'Urban Traffic Flow Prediction',
    imageUrl: null,
    description: 'Contribute to next-gen smart city systems by training neural networks to predict complex traffic patterns. Simulated dream sequences will generate urban mobility data that helps AI reroute autonomous vehicles in real-time, reducing congestion and emissions.',
    tags: ['Smart City', 'Simulation'],
    price: '85$ per job'
  },
  {
    id: 9,
    title: 'Quantum Pattern Recognition',
    imageUrl: null,
    description: 'Apply subconscious pattern recognition to assist in solving high-dimensional quantum data structures. Your cognitive processing during sleep is used to detect anomalies in entangled particle behaviors, helping push forward theoretical models in quantum AI.',
    tags: ['Quantum', 'Neuroscience'],
    price: '300$ per hour'
  },
  {
    id: 10,
    title: 'Deepfake Detection Training',
    imageUrl: null,
    description: 'Support efforts in digital media integrity by helping neural networks learn to detect deepfakes. Your dreams will be infused with synthetic and real facial data to train AI to recognize deep learning-based visual manipulations across platforms.',
    tags: ['Security', 'Media'],
    price: '120$ per job'
  },
  {
    id: 11,
    title: 'Emotion-Based Music Composition',
    imageUrl: null,
    description: 'Participate in emotion-driven music generation. While sleeping, your brain’s response to sound is recorded and interpreted to teach AI how to compose music that resonates emotionally with listeners, tailored to personal moods and psychological profiles.',
    tags: ['Music', 'Affective Computing'],
    price: '95$ per session'
  },
  {
    id: 12,
    title: 'Virtual Therapist AI Feedback',
    imageUrl: null,
    description: 'Help develop emotionally intelligent AI therapists by providing subconscious feedback to simulated dialogues. Your brain will be engaged in empathic role-play scenarios, enhancing models of compassion, tone recognition, and responsive care in virtual therapy.',
    tags: ['Mental Health', 'AI'],
    price: '60$ per dialogue'
  },
  {
    id: 13,
    title: 'AI-Generated Law Review',
    imageUrl: null,
    description: 'Lend your cognitive analysis to legal AI systems as they study case law, precedent, and argument patterns. Your mind will process simulated courtroom transcripts to help machines grasp nuance in legal reasoning and develop fairer automated verdict recommendations.',
    tags: ['Legal Tech', 'NLP'],
    price: '110$ per analysis'
  },
  {
    id: 14,
    title: 'Animal Behavior Modeling',
    imageUrl: null,
    description: 'Contribute to realistic wildlife simulation models by mentally analyzing behavior patterns of animals in various ecosystems. Your dream-generated instincts help AI recreate lifelike predator-prey dynamics and migration behaviors in digital environments.',
    tags: ['Biology', 'Simulation'],
    price: '50$ per session'
  },
  {
    id: 15,
    title: 'AI Dream Synthesis Research',
    imageUrl: null,
    description: 'Engage in guided dream states where your subconscious contributes to AI-driven narrative generation. These dreams are used as training data for generative models that aim to simulate human creativity and imagination in storytelling contexts.',
    tags: ['Sleep', 'Storytelling'],
    price: '200$ per dream'
  },
  {
    id: 16,
    title: 'Hyper-Realistic Avatar Interaction',
    imageUrl: null,
    description: 'Help train digital avatars by participating in dream scenarios involving social interactions. These simulations are used to improve AI response timing, facial expressiveness, and emotional nuance in virtual environments like the metaverse or digital therapy.',
    tags: ['VR', 'Human Interaction'],
    price: '90$ per hour'
  },
  {
    id: 17,
    title: 'Brain-to-Brain Communication Models',
    imageUrl: null,
    description: 'Support the development of experimental neural link protocols that simulate telepathic exchanges. Your brainwaves will be used to train algorithms that decode intention, imagery, and linguistic structure from one mind to another without verbal communication.',
    tags: ['Neurotech', 'Experimental'],
    price: '250$ per session'
  },
  {
    id: 18,
    title: 'Ethical Reasoning Dataset Curation',
    imageUrl: null,
    description: 'Participate in the construction of AI ethical frameworks by navigating dream-based moral dilemmas. Your decisions and thought patterns during these simulations help curate datasets that teach machines fairness, bias awareness, and value alignment.',
    tags: ['Ethics', 'AI'],
    price: '80$ per task'
  },
  {
    id: 19,
    title: 'Underwater Sonar Interpretation',
    imageUrl: null,
    description: 'Help develop underwater exploration AIs by dreaming through sonar audio patterns. Your subconscious will assist in identifying terrain features, marine life, and object anomalies in deep-sea acoustic data used by autonomous submersibles.',
    tags: ['Marine', 'Signal Processing'],
    price: '105$ per batch'
  },
  {
    id: 20,
    title: 'Smart Wearable Gesture Recognition',
    imageUrl: null,
    description: 'Train motion-sensing AI models by processing gesture scenarios in your dreams. The subconscious recognition of hand and body movements will help refine machine understanding of user intent in wearable tech and augmented interfaces.',
    tags: ['Wearables', 'UX'],
    price: '65$ per session'
  },
  {
    id: 21,
    title: 'Alien Language Decoding Simulation',
    imageUrl: null,
    description: 'Enter dream-based linguistics labs where your brain attempts to decipher simulated alien dialects. This task contributes to speculative AI capable of recognizing language-like patterns in unknown signal sources or invented sci-fi systems.',
    tags: ['Speculative', 'Linguistics'],
    price: '500$ per scenario'
  },
  {
    id: 22,
    title: 'Historical Reconstruction from Memory',
    imageUrl: null,
    description: 'Engage in simulated memory journeys where you help AI recreate plausible historical events. Your dream scenarios combine emotion, pattern completion, and associative memory to restore moments lost to history or generate alternate timelines.',
    tags: ['History', 'Simulation'],
    price: '130$ per scene'
  },
  {
    id: 23,
    title: 'Synthetic Food Texture Perception',
    imageUrl: null,
    description: 'Assist AI in learning how humans perceive food textures by processing multisensory taste experiences in dreams. Your subconscious will explore consistency, crunch, and mouthfeel to train food-generation systems for synthetic cuisine.',
    tags: ['Food Tech', 'Sensory'],
    price: '70$ per trial'
  },
  {
    id: 24,
    title: 'Predictive Policing Ethics Simulation',
    imageUrl: null,
    description: 'Navigate complex dream simulations of futuristic law enforcement scenarios. Your decisions and emotions inform predictive policing algorithms, helping to ensure they are ethically guided, unbiased, and socially accountable.',
    tags: ['Justice', 'Simulation'],
    price: '90$ per session'
  },
  {
    id: 25,
    title: 'Space Mission Cognitive Load Balancing',
    imageUrl: null,
    description: 'Train AI assistants to support astronauts under pressure by simulating space-mission cognitive load. Your sleep patterns are used to identify overload points and optimize mental task management under extreme conditions.',
    tags: ['Space', 'Cognition'],
    price: '150$ per hour'
  },
  {
    id: 26,
    title: 'AI-Generated Poetry Evaluation',
    imageUrl: null,
    description: 'Help refine the poetic sensibilities of generative AIs by reacting to dream-composed verses. Your subconscious feedback is interpreted to help machines better understand literary rhythm, metaphor, and emotional resonance.',
    tags: ['Art', 'Language'],
    price: '40$ per batch'
  }]