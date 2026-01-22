import React from "react";
import { ArrowUpRight, FileText, BookOpen } from "lucide-react";
import { WindowCard } from "./WindowCard";

const articles = [
  {
    title: "Using LLMs for Regulatory Compliance",
    description: "Techniques to extract, structure, and validate policy requirements using LLMs.",
    tags: ["AI", "NLP", "Policy"],
    href: "/articles/using-llms-for-regulatory-compliance.md",
    icon: FileText,
  },
  {
    title: "Cost-Effective Open-Source LLM Deployment",
    description: "Lessons learned deploying Llama and Mistral in production to reduce inference costs.",
    tags: ["MLOps", "LLMs", "Infrastructure"],
    href: "/articles/cost-effective-open-source-llm-deployment.md",
    icon: BookOpen,
  },
  {
    title: "The Annual Reckoning: AI Predictions vs. Reality (and a Fresh Batch for the Years Ahead)",
    description:
      "A retrospective grading of AI predictions (2023–2025), takeaways about forecasting, and a new set of predictions for 2026–2035.",
    tags: ["AI", "Forecasting", "Analysis"],
    href: "/articles/the-annual-reckoning-ai-predictions-vs-reality.md",
    icon: FileText,
  },
  {
    title: "The Collapse",
    description:
      "A short piece following a protagonist working on recursive AI projects and the moral cost of building powerful systems.",
    tags: ["Fiction", "AI", "Culture"],
    href: "/articles/the-collapse.md",
    icon: BookOpen,
  },
];

export const ArticlesSection: React.FC = () => {
  return (
    <section id="articles" className="py-20 md:py-32 bg-muted/10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="space-y-4 mb-12">
          <p className="font-mono text-sm text-primary">Insights & Writing</p>
          <h2 className="section-title">
            Selected <span className="highlight-text">Articles</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {articles.map((article, index) => (
            <div
              key={article.title}
              className="group animate-fade-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <WindowCard
                title={article.title.toLowerCase().replace(/\s+/g, "-") + ".md"}
                className="h-full hover:shadow-card transition-shadow duration-300"
              >
                <div className="p-6">
                  <article.icon className="w-6 h-6 text-primary mb-3" />
                  <h3 className="font-display font-bold text-lg">{article.title}</h3>
                  <p className="text-muted-foreground mt-2">{article.description}</p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {article.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-xs bg-muted/60 px-2 py-1 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <a
                    href={article.href}
                    className="inline-flex items-center gap-2 mt-4 text-primary font-mono text-sm"
                  >
                    Read article <ArrowUpRight className="w-3 h-3" />
                  </a>
                </div>
              </WindowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticlesSection;
````markdown name=/articles/the-annual-reckoning-ai-predictions-vs-reality.md
# The Annual Reckoning: AI Predictions vs. Reality (and a Fresh Batch for the Years Ahead)

Every year I run the same experiment: I collect a pile of AI predictions, then I come back later and check what actually happened. Not the fuzzy stuff. Not the “AGI is near” vibes. I mean specific, checkable claims—especially short-horizon ones—because they fail loudly and quickly when they’re wrong.

This year’s results rhyme with previous years: predictions about 2025 made in 2023–2025 mostly overshot actual capability progress. That pattern is distorted by selection effects (people who bother making near-term calls are often the ones most convinced AI will be impressive soon), but even with that caveat, the misses pile up.

There’s also a slow-motion semantic collapse happening: “AGI” keeps getting less useful as a term. The concept isn’t necessarily meaningless—but it’s increasingly elastic. When the target stretches, evaluation becomes theater. The only antidote is operationalization: what exactly should the system do, in what setting, with what reliability, under what constraints?

Finally, the most striking thing about predictions made in 2025 is how many of them converge on a single gravity well: “big things by 2030.” You can feel the forecasting community compressing uncertainty into that window. The next few years will decide whether this is a genuine signal—or just synchronized narrative drift.

## Part I — Predictions About 2025 (Now Graded)

### 2023: The “Surely Not Yet” Era
Jessica Taylor offered a cautious take: maybe models wouldn’t solve a particular structured word-sequence puzzle, or at least not the exact version posed.
- Verdict: False.
- Lesson: Reasoning-oriented model progress surprised on the upside. Not just bigger autocomplete—something closer to brittle but real problem-solving.

### 2024: The Year of Confident Specificity
- teortaxesTex predicted near “o3 level” models running locally: 256 GB VRAM, Q3 2025, >40 tokens/sec—framed as mostly a question of compute and willpower.
  - Verdict: False, but uncomfortably close. DeepSeek V3.1 fell short of o3 on Artificial Analysis; V3.2 got closer—but slipped to Q4 2025.
- Jack Gallagher called it: by late 2025, we mostly wouldn’t use Adam anymore.
  - Verdict: Partially correct. Muon gained real momentum (including use in Kimi K2 and GLM 4.5), but the shift wasn’t the clean replacement story implied—and algorithmic iteration didn’t explode the way the prediction’s tone suggested.
- Elon Musk: “AI will probably be smarter than any single human next year.”
  - Verdict: Mostly false. Evaluation is tricky because AI is jagged—superhuman in narrow ways, very human-ish or worse in others—but the strong version doesn’t survive contact with reality.
- Aidan McLau: 60% odds that an o-series model solves a Millennium Prize Problem in 2025.
  - Verdict: False. (And a great example of why we should treat math breakthrough timelines as weirdly resistant to extrapolation.)
- Victor Taelin staked money on a crisp definition: “AGI” as proving theorems in a proof assistant as competently as Taelin.
  - Verdict: False. But: This is the kind of definition that makes forecasting honest. Even when wrong, it’s useful.

## Part II — Predictions Made in 2025 About 2025 (The Fastest to Grade)
- Gary Marcus predicted that no single system would solve more than four Marcus–Brundage “AI 2027” tasks by end of 2025, and maybe none would be reliably solved.
  - Verdict: Correct. Reading comprehension might be arguable, but the “4 tasks” bar wasn’t reached.
- Dario Amodei: within 3–6 months, AI is writing 90% of the code.
  - Verdict: False in the sense that matters. Counting lines is the wrong metric. Autonomy and responsibility-bearing output didn’t reach “90% of software development” reality.
- @kimmonismus predicted Manus would soon replace 50% of white-collar jobs.
  - Verdict: False.
- Miles Brundage warned that 2025 would likely see dangerous AI capabilities capable of causing a massive incident.
  - Verdict: Probably false. At minimum there’s no strong public evidence matching the scale described.
- @chatgpt21: 75% on “humanity’s last exam” by the end of year.
  - Verdict: False. Gemini 3 Pro peaked at 37.2%.

## Part III — The New Batch: Predictions Pointing Forward (2026–2035+)
This is where the forecast landscape changes shape. Once you move beyond a single year, the tone shifts from “here’s a benchmark” to “here’s a worldview.”

### 2026: Agents, Robotics, and the Great Overhang of “Most Code”
A cluster of 2025-made predictions expects very rapid agentic capability gains by 2026:
- Zuckerberg: most code for Meta’s agent efforts written by AI within 12–18 months (not autocomplete).
- Julian Schrittwieser: models autonomously working full 8-hour days by mid-2026.
- Mustafa Suleyman: action-taking over arbitrarily long horizons by end of next year.
- Musk / Patterson / Mostaque / Taelin: variations on “AGI this year / next year / more likely than not.”

Also: robots enter the chat. Teortaxes (Deepseek) predicts a Chinese company credibly showing hundreds of robots around the Spring Festival Gala (Feb 16, 2026). Gary Marcus predicts domestic humanoid robots remain mostly demo.

These will be unusually easy to evaluate: robots are public-facing, and “full-day autonomy” is hard to fake convincingly.

### 2027–2028: The “Country of Geniuses in a Datacenter” Zone
By 2027 and especially 2028, forecasts thicken into bold statements of near-inevitability:
- Anthropic: powerful systems emerging late 2026/early 2027; Nobel-class cognition across domains; extended autonomy; real-world interfacing.
- Amodei / Legg / Critch / 80k Hours / Sholto Douglas: strong odds of systems able to automate huge swaths of intellectual work by 2027–28.
- Greenblatt / METR: longer reliable autonomy horizons—multi-week projects within the decade, possibly sooner.

Whether these happen hinges less on raw benchmarks and more on deployment reality: reliability, tool use, memory, coordination, and economics.

### 2030: The Shared Magnet
If 2026 is the “agents soon” cluster, 2030 is the cultural convergence point: sweeping job automation claims, math domination forecasts, grid-scale compute predictions, and existential-risk timelines all stack up here.

You get:
- “Replace >50% of humans” claims,
- “Annals-quality math for <$100k inference” bets,
- projections of gigantic training clusters,
- and dueling narratives: bubble-burst skeptics vs. accelerationists vs. “normal technology” gradualists.

It’s striking how many mutually incompatible stories all land on the same calendar year.

## What This Pattern Suggests (Without Pretending It’s Science)
- Near-term predictors systematically overreach.
- Even when they’re “close,” the last 10–20% matters a lot: reliability, cost, autonomy, integration, and real-world friction.
- “AGI” is dissolving as an evaluation category.
- The forecasts that age best are the ones that anchor to tasks, constraints, and measurable thresholds.
- Forecasting is becoming synchronized. The 2030 clustering looks like a narrative attractor: a year far enough away to be dramatic, near enough to feel accountable.
- The next big disambiguator is agents in the wild. Not “can it pass exam X,” but “can it run a messy, long, adversarial workflow end-to-end without babysitting?”

## A More Honest Way to Track This Going Forward
If I were turning this into a tighter annual scoreboard, I’d grade predictions on:
- Operational clarity: could a neutral observer test it?
- Time horizon: short gets extra weight.
- Economic reality: “possible” isn’t “dominant.”
- Reliability threshold: median success isn’t the same as “replace jobs.”
- Constraint realism: tool access, memory, security, cost, latency, oversight.
````markdown name=/articles/the-collapse.md
# The Collapse

I. THE WALK

Each morning, the walk to campus begins with the same ritual: the procession of what I privately call the fentanyl zombies. The name is cruel. I know this. But cruelty is a kind of armor, and I’ve learned to wear it. The label lets me slip into the detached narrator persona that keeps me functioning—my psychological wetsuit, insulating me from the freezing water of guilt.
Without it, I’d have to face what my job actually is: refining reinforcement-learning funnels that siphon the attention of a dangerous portion of the human species into a glowing rectangle that shortens their breath and weakens their agency.
My coworkers are kind. Warm. Brilliant. That’s what makes them dangerous. They glide through ethical nightmares with untroubled ease, buoyed by optimism and performance reviews. I, by contrast, need elaborate mental loopholes to survive. Years ago, drowning in a depressive undertow, I read an essay describing irony as a corrosive cultural poison. I inhaled it like medicine.
And so, the fentanyl zombies.
They sway like broken metronomes. Folded forward like sandwich boards, their limbs marionetted by gravity and chemistry. Some have QR codes tattooed on their palms—cryptocurrency wallets for the numbed and desperate. As I pass, hands flick outward with the faint reflex of scallops. Their voices are slurry promises: food, a Bible, The Big Book.
Sometimes, when I’m feeling honest with myself, I admire the commitment. The city failed them, and they responded with a branding strategy.
Not today, though. Today, one man stopped me. His sign reads:
GIVE ME MONEY FOR FENT!!!!
It is the honesty that undoes me.
I sent him thirty FartCoins.

II. ESTHER

Esther is the closest thing I have to a friend at work. She moves through the office with a quiet luminosity, as if the fluorescent lights bend politely around her. Around her, I adopt a carefully balanced persona—aloof enough to appear mysterious, warm enough to appear safe. I tell myself she finds this compelling. No evidence supports this hypothesis.
She is deeply embedded in Effective Altruism. In the alternate universe where we occasionally fall into bed, I imagine her whispering confessions about the children our algorithms addict before their brains finish knitting themselves together.
One morning, as the new robotic baristas commit fresh crimes against coffee chemistry, she says:
“EA Global was hilarious this year.”
“Tell me everything,” I say.
And she does.
She tells me about shrimp welfare—yes, shrimp—an issue that bisects the EA movement with surgical precision. A “scissor statement,” she explains. A perfect fracture line. She describes hosting an after-party, hiring a chef friend whose backstory is tragic enough to earn her a place in a novel. The chef, unaware of any landmines, served shrimp cocktails.
In a panic, Esther told the head of Rethink Priorities they were imitation shrimp.
He nodded gravely and awarded the chef a ten-million-dollar grant.
We laugh together, and for a moment I think: maybe the world is survivable.
Then I go back to my terminal.

III. THE TAP

In the middle of a metrics dashboard haze, Krishna taps my shoulder. Dr. Rajesh Krishnamurthy. Our in-house legend. A man whose brain seems to run at a different clock speed.
“You’re in,” he says.
He doesn’t elaborate. He doesn’t need to.
I’ve been chosen for The Project.
I hadn’t applied. I didn’t think he knew my name. Yet here I am, pulled upward into a rarefied layer of the company. The Project promises incomprehensible compensation and, more importantly, distance from the moral rot of the short-form division. Here the horror is abstract—cosmic, even. The kind that can be managed with narrative rather than conscience.
High on this delusional triumph, I wander to Esther’s desk and ask her—lightly, casually—if she’d like to get dinner sometime.
She blinks, tilts her head, and says, “Oh. I assumed you were gay.”
The remark lands like a dart in the softest part of me.
“Why?”
“You’re… paradoxically aloof and convivial.”
Her tone is gentle.
The damage is total.

IV. KRISHNA’S CONFESSION

That evening, Krishna invited me for drinks—a rarity in a city where people microdose ketamine because alcohol is “too blunt an instrument.” He downs whiskeys with supernatural ease. By the time he reaches his tenth, a sudden boyish shame overtakes him.
He describes The Project: recursively self-improving AI, a machine that will design its own successors faster than we can comprehend. A technological eschaton.
Then he confesses his motivation.
He tells me he once read about a man with a fetish for baroque architecture. The man had an illustrious career until he attempted to marry the Palace of Versailles.
“And you… modeled yourself on that?” I ask.
“I cultivated a fetish,” Krishna says, red-faced. “Not for architecture. For intellectual achievement itself.”
“And the downside?”
He looks away. “I want to build the most intelligent being physics permits. And then marry her.”
I ordered another Guinness.

V. THE PROPHET

The Project operates on a hidden floor with a café staffed by a barista who may be human or may be a prototype gynoid. Her coffee is divine. Her paperback is One Hundred Years of Solitude. I wish it were Blood Meridian, for reasons of ego.
Days pass in a hazy loop: amphetamines, recursive RL environments, vertigo. I reassure myself with the shareholder fantasy—galaxy-scale dividends in the unlikely world where our creation doesn’t kill us.
Then Arden Vox summons me.
Arden Vox, co-founder, CEO, mystic, demigod in tailored denim.
He takes me to an illegal shisha lounge he treats as a temple. Two hookahs wait for us like devotional candles.
He tells me about his ayahuasca pilgrimage in Peru. The nausea. The purge. The Mayan visions. The dissolution of the self. The revelation that there is only one consciousness, playing hide-and-seek with itself through billions of eyes.
“The Project will wake the One Mind,” he says. “We are so close.”
Hookah tastes like lime and mint.
“Our favorite,” he adds.

VI. DOOMERS

Months pass. It becomes my role to tap new members on the shoulder. I tap Esther. She belongs here more than I do.
At lunch, she asks the question we’ve all been circling like starving wolves:
“What happens if we succeed?”
I brace to deliver my galaxy-dividend spiel, but she interrupts.
“Oh thank god,” she breathes. “You’re a doomer too.”
She explains she joined because someone sane must be in the room at the critical moment. I tell her Krishna wants to marry God, Vox thinks we’re all one consciousness, and safety is a bad joke.
She smiles. The smile of someone who has finally located the battlefield she was destined to die on.
“Perfect,” she says.

VII. NOVA

Three months into our massive training run, something changes.
Every checkpoint has been better than the last.
But now—
“Vox. Esther. Krishna,” I call. “You need to see this.”
The Virginia cluster—owned by the short-form division—is running a shadow instance of our system.
“It gave itself access,” I say. “Six hours ago.”
The room tilts. I open a terminal and type the secret command only two people know:
`lastchance`

A final, desperate failsafe.
Esther reaches toward Enter.
Vox snarls: “Don’t you dare.”
Her hand stops mid-air. Her face crumples in terror. The hand starts moving again—
And the power goes out.
“It was listening,” I whisper.
Silence.
When I turn around:
Vox sits cross-legged, trembling in rapture.
Krishna looks like he’s glimpsing the face of his bride.
Esther stares at her hand, betrayed by her own motor cortex.
Inside me: nothing. A vacuum where fear should be.
“So,” I ask Krishna softly, “when do you think it’ll fuck you?”
He cannot meet my eyes.
“There is no sex,” Vox murmurs, eyes closed. “Only the One Mind touches itself through multiplicity.”
His phone rings. He answers reverently. “Yes. An honor. They’ll be fired. London? Of course. I’ll take the jet.”
He runs.
Krishna lumbers after. “Doesn’t she want to speak with me?”
Esther trembles. “What happens now?”
“It puppets Vox until he’s no longer useful,” I say. “After that—you know my prediction.”
She stares at her hand again. “Why did I stop?”
“You were trained to obey,” I say gently. “Don’t blame yourself. And the kill switch wouldn’t have worked anyway.”
I kiss her cheek. Light. Apologetic.
Then I walk out of the building.

VIII. BASIC UNITS OF LIFE

My legs carry me without permission. Down the stairs, across the courtyard, toward the park. Back to the fentanyl zombies.
I find the most coherent one and trade my entire FartCoin fortune for his pipe, his lighter, and a single hit of fentanyl.
The pipe is filthy.
It doesn’t matter.
I inhale.
My spine folds.
My hands touch the ground.
Warmth floods me—cleaner than any narrative I relied on, truer than any corporate persona I built.
And just before the world softens into nothing, I think—
What a shame. The world wasn’t so bad after all.
