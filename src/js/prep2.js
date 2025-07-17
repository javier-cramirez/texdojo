export const problems = [
  {
    title: "Pythagorean Theorem",
    latex: "c = \\sqrt{a^2+b^2}",
    tokens: [
      "c",
      "=",
      "\\sqrt",
      "{",
      "a",
      "^2",
      "+",
      "b",
      "^2",
      "}"
    ],
    categories: ["geometry", "elementary algebra"]
  },
  {
    title: "Sum of first \\(n\\) Squares",
    latex: "\\sum_{i=1}^n i^2 = \\frac{n(n+1)(2n+1)}{6}",
    tokens: [
      "\\sum",
      "_{i=1}",
      "^n",
      "i",
      "^2",
      "=",
      "\\frac",
      "{",
      "n",
      "(",
      "n",
      "+",
      "1",
      ")",
      "(",
      "2",
      "n",
      "+",
      "1",
      ")",
      "}",
      "{",
      "6",
      "}"
    ],
    categories: ["elementary algebra", "discrete mathematics"]
  },
  {
    title: "Law of Cosines",
    latex: "c^2 = a^2 + b^2 - 2ab \\cos \\angle C",
    tokens: [
      "c",
      "^2",
      "=",
      "a",
      "^2",
      "+",
      "b",
      "^2",
      "-",
      "2",
      "ab",
      "\\cos",
      "\\angle",
      "C"
    ],
    categories: ["geometry", "trigonometry"]
  },
  {
    title: "Euler's Identity",
    latex: "e^{\\pi i} + 1 = 0",
    tokens: [
      "e",
      "^{\\pi i}",
      "+",
      "1",
      "=",
      "0"
    ],
    categories: ["complex numbers", "elementary algebra"]
  },
  {
    title: "Gravitation",
    latex: "F = \\frac{Gm_1m_2}{d^2}",
    tokens: [
      "F",
      "=",
      "\\frac",
      "{",
      "Gm",
      "_1m",
      "_2",
      "}",
      "{",
      "d",
      "^2",
      "}"
    ],
    categories: ["elementary algebra", "applied mathematics"]
  },
  {
    title: "Generalized Stokes' theorem",
    latex: "\\int_{\\partial M} \\omega = \\int_M \\mathrm{d} \\omega",
    tokens: [
      "\\int",
      "_{\\partial M}",
      "\\omega",
      "=",
      "\\int",
      "_M",
      "\\mathrm",
      "{",
      "d",
      "}",
      "\\omega"
    ],
    categories: ["multivariable calculus", "differential geometry"]
  },
  {
    title: "Chaitin's Constant",
    latex: "\\Omega_{F} = \\sum_{p \\in P_F} 2^{-|p|}",
    tokens: [
      "\\Omega",
      "_{F}",
      "=",
      "\\sum",
      "_{p \\in P_F}",
      "2",
      "^{-|p|}"
    ],
    categories: ["theoretical computer science", "information theory"]
  },
  {
    "title": "Fourier Transform",
    "latex": "\\hat{f}(\\omega) = \\int_{-\\infty}^\\infty f(x) e^{-2\\pi i x \\omega} \\mathrm dx",
    "tokens": [
      "\\hat",
      "{",
      "f",
      "}",
      "(",
      "\\omega",
      ")",
      "=",
      "\\int",
      "_{-\\infty}",
      "\\infty",
      "f",
      "(",
      "x",
      ")",
      "e",
      "^{-2\\pi i x \\omega}",
      "\\mathrm",
      "dx"
    ],
    categories: ["signal processing", "harmonic analysis"]
  },
  {
    title: "Bellman Optimality Equation",
    latex: "V^*(s) = \\max_a \\bigl[ R(s,a) + \\gamma \\sum_{s'} P(s'\\mid s,a)\\,V^*(s') \\bigr]",
    tokens: [
      "V","^*","(","s",")","=",
      "\\max","_a",
      "[",
        "R","(","s",",","a",")",
        "+","\\gamma",
        "\\sum","_{","s","'","}",
          "P","(","s","'","\\mid","s",",","a",")",
        "V","^*","(","s","'",")",
      "]"
    ],
    categories: ["reinforcement learning", "dynamic programming"]
  },

  {
    title: "Q-Learning Update",
    latex: "Q_{t+1}(s,a) = Q_t(s,a) + \\alpha\\bigl[ r + \\gamma\\max_{a'} Q_t(s',a') - Q_t(s,a) \\bigr]",
    tokens: [
      "Q","_{t+1}","(","s",",","a",")","=",
      "Q","_t","(","s",",","a",")",
      "+","\\alpha",
      "[",
        "r",
        "+","\\gamma",
        "\\max","_{a'}",
          "Q","_t","(","s","'",",","a","'",")",
        "-","Q","_t","(","s",",","a",")",
      "]"
    ],
    categories: ["reinforcement learning", "dynamic programming"]
  },

  {
    title: "Policy Gradient Theorem",
    latex: "\\nabla_\\theta J(\\theta) = \\mathbb{E}_{s,a\\sim\\pi_\\theta}\\bigl[ \\nabla_\\theta \\log\\pi_\\theta(a|s)\\,Q^{\\pi}(s,a) \\bigr]",
    tokens: [
      "\\nabla","_{\\theta}","J","(","\\theta",")","=",
      "\\mathbb{E}","_{","s",",","a","\\sim","\\pi","_\\theta","}",
      "[",
        "\\nabla","_{\\theta}",
        "\\log","\\pi","_\\theta","(","a","|","s",")",
        "Q","^{\\pi}","(","s",",","a",")",
      "]"
    ],
    categories: ["reinforcement learning"]
  },

  {
    title: "TD(λ) Return",
    latex: "G_t^{\\lambda} = (1-\\lambda)\\sum_{n=1}^{\\infty} \\lambda^{\,n-1} G_t^{(n)}",
    tokens: [
      "G","_t","^{\\lambda}","=",
      "(","1","-","\\lambda",")",
      "\\sum","_{n=1}","^{\\infty}",
      "\\lambda","^{n-1}",
      "G","_t","^{(","n",")}"
    ],
    categories: ["reinforcement learning"]
  },

  {
    title: "Softmax Policy",
    latex: "\\pi(a|s) = \\frac{\\exp\\bigl(h(s,a)\\bigr)}{\\sum_b \\exp\\bigl(h(s,b)\\bigr)}",
    tokens: [
      "\\pi","(","a","|","s",")","=",
      "\\frac",
        "{","\\exp","(","h","(","s",",","a",")",")","}",
        "{","\\sum","_b","\\exp","(","h","(","s",",","b",")",")","}"
    ],
    categories: ["reinforcement learning"]
  },
  {
    title: "Universal Gravitation",
    latex: "F=G\\frac{m_{1}m_{2}}{r^2}",
    tokens: [
        "F", "=", "G", "\\frac", "{m_{1}m_{2}}", "{r^2}"
    ],
    categories: ["newtonian physics", "physics", "physics 1"]
  },
  {
    title: "Generating Function",
    latex: "G(x)=\\sum_{k\\geq 0} a_k x^k",
    tokens: [
        "G(x)", "=", "\\sum", "_{k\\geq 0}", "a_k", "x^k"
    ],
    categories: ["combinatorics", "probability"]
  },
  {
    title: "Generating Function for Partitions",
    latex: "\\prod_{k\\geq 1}\\frac{1}{1-x^k}",
    tokens: [
        "\\prod", "_{k\\geq 1}", "\\frac", "{1}", "{1-x^k}"
    ],
    categories: ["combinatorics", "probability"]
  }
];
