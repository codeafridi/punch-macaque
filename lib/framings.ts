export interface Framing {
  id: number
  label: string
  badge: string
  title: string
  paragraphs: string[]
  accentColor: string
}

export const framings: Framing[] = [
  {
    id: 1,
    label: 'Neutral Journalistic',
    badge: 'FRAMING 1 OF 3',
    accentColor: '#8B949E',
    title: 'Abandoned Macaque at Japanese Zoo Integrates with Troop After Viral Social Media Attention',
    paragraphs: [
      'A juvenile Japanese macaque at the Ichikawa City Zoo has successfully begun integrating with its troop, following a period of global social media attention. The macaque, named Punch, was born at the facility in July 2025 and was subsequently rejected by its mother. In response, zookeepers hand-reared the infant and provided it with a stuffed orangutan toy for comfort.',
      'Videos of Punch clinging to the toy circulated widely online, documenting his initial difficulties socializing with the zoo\'s macaque troop. Early footage showed other monkeys chasing and pushing him away. The zookeeper, Kosuke Shikano, explained the toy was introduced because infant macaques instinctively cling to their mothers to build muscle and feel secure, a need that was unmet due to the abandonment.',
      'By early 2026, the zoo reported significant progress in Punch\'s socialization. Subsequent videos showed other macaques grooming him, a key indicator of social bonding in the species. According to primatology expert Alison Behie, the initial aggressive interactions are considered regular social behavior within the strict matrilineal hierarchies of Japanese macaques. Behie also noted that maternal abandonment, while unusual, can be attributed to factors such as the mother\'s inexperience or environmental stressors. The viral phenomenon led to a substantial increase in visitors to the zoo, prompting officials to enforce stricter barriers around the enclosure.',
    ],
  },
  {
    id: 2,
    label: 'Emotional Storytelling',
    badge: 'FRAMING 2 OF 3',
    accentColor: '#58A6FF',
    title: 'A Tale of Hope and a Stuffed Orangutan',
    paragraphs: [
      'In a world that can often feel isolating, the story of a tiny Japanese macaque named Punch became an unexpected symbol of loneliness and resilience, capturing the hearts of millions. Cast out by his own mother shortly after birth, Punch faced a world of cold indifference. Alone and vulnerable, he was seen in heartbreaking footage being pushed away and bullied by the very troop that should have been his family.',
      'In his despair, Punch found a lifeline. Zookeepers, witnessing his struggle, gave him a small, stuffed orangutan. This plush toy became more than an object; it was his surrogate mother, his constant companion, and his shield. He clung to it with a desperation that mirrored a universal need for connection, a poignant display of infant attachment in the absence of a real maternal bond. The world watched, their empathy ignited, as this tiny primate navigated his grief by pouring his need for comfort into his inanimate friend.',
      'This act of anthropomorphism—seeing our own deep-seated need for family and safety in Punch\'s plight—is what made his story so powerful. But this is not just a tale of sorrow. It is a story of redemption. After weeks of isolation, a glimmer of hope appeared. Another monkey was filmed gently grooming Punch, offering the first touch of acceptance. Soon after, another offered a comforting hug. Punch\'s journey from a heartbroken outcast to a slowly integrating member of his troop is a powerful reminder that even after the deepest rejection, the warmth of connection can find its way in.',
    ],
  },
  {
    id: 3,
    label: 'Critical Ethical',
    badge: 'FRAMING 3 OF 3',
    accentColor: '#FF7B72',
    title: 'Punch the Macaque: A Critical Examination of Captivity and Trauma',
    paragraphs: [
      'The global fascination with Punch, the baby macaque clinging to a stuffed orangutan, is often framed as a heartwarming story of resilience. A critical ethical perspective, however, reframes this viral moment as a troubling symptom of the inherent moral issues of animal captivity. Punch\'s story is not an isolated tragedy but a public glimpse into the trauma of a young, highly social primate coping with maternal abandonment, isolation, and loss in an unnatural environment. His attachment to an inanimate toy is not merely "cute"; it is a heartbreaking substitute for the family, safety, and social learning that were taken from him.',
      'The viral videos of Punch being "bullied" are often misinterpreted. While these may be normal social interactions for macaques, his lack of maternal guidance leaves him ill-equipped to navigate his troop\'s complex hierarchy, potentially causing long-term psychological harm. This narrative of a lonely individual struggling to integrate should not just evoke sympathy; it should provoke critical questions about the systems that treat intelligent, sentient beings as entertainment commodities.',
      'Punch\'s story is a powerful reminder of the emotional and developmental needs of captive primates and forces us to confront the ethical compromises inherent in a world where wild animals are confined for human amusement. It compels us to look beyond the individual and question the very institution of the zoo.',
    ],
  },
]
