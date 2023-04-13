var app = new Vue({
  el: '#app',
  data: {
    active: 0,
    list: [],
    title: '服务客户  成就律师',
    isRight: false,
    text1: '投递简历',
    text2: '返回'
  },
  methods: {

    toSecond(num) {
      this.active = num
      let lang = localStorage.getItem('language')
      if (lang == 'en') {
        this.text1 = 'Resume Submission'
        this.text2 = 'Back'
      } else {
        this.text1 = '投递简历'
        this.text2 = '返回'
      }
      if (num == 1) {
        this.title = '城市合伙人'
        this.list = [
          {
            H2: lang == 'en' ? 'I.Regional Partners are entitled to the following treatments:' : '一、城市合伙人可享受的待遇：',
            p:
              lang == 'en' ?
                [
                  '1. 80% of the business commission ratio without apportioning or renting cubicles and offices.',
                  '2. Shanghai social security, points settlement, school procedures and medical care for children of migrant workers  and other related law firm assistance matters.',
                  '3. The opportunity to cooperate with local public case sources, and reach major industry resources and client resources.',
                  '4. The local team management incentive cooperation program: Regional Partners who meet the criteria can be promoted to Senior Partners of Legallinks, enabling them to build a team and participate in decision-making. If they meet the criteria, the team can be transformed into a branch office model.',
                  '5. The opportunity to receive good training and participate in various business exchanges, forum lectures, annual meetings, and other cultural and sports activities organized by the law firm is available through multi-level, extensive content, and flexible forms of training activities, allowing lawyers of all grades to remain in a continuous state of learning at any time.',
                ] :
                [
                  '1.无需分摊或租赁工位和办公室即可享受80%的业务提成比例；',
                  '2.享受上海社保、积分落户、随迁子女就读及医疗等相关律所协助事宜；',
                  '3.享受城市当地公共案源的合作机会，有机会接触并合作各大行业资源和客户资源；',
                  '4.享受当地团队管理激励合作方案：符合嘉厚律师所高级合伙人条件的城市合伙人，可晋升为上海嘉厚律师事务所高级合伙人，组建团队并参与嘉厚律师事务所的决策，组建团队符合设立分所条件的，可转化成分所模式；',
                  '5.有机会获得良好的培训及参与律所组织的各类业务交流、论坛讲座、旅游年会等文体活动，通过多层次、内容广泛、形式灵活的培训活动，各年级的律师随时置身于持续的学习状态中。'
                ]
          },
          {
            H2: lang == 'en' ? 'Ⅱ. Legallinks online collaborative office mode:' : '二、嘉厚线上的协同办公模式：',
            p:
              lang == 'en' ?
                [
                  '1. Through the online OA system, electronic signature system, electronic invoicing system and video conferencing, as well as other online office channels, attorneys can handle the corresponding contracting procedures and normal business processing remotely from home.',
                  '2. Regional Partners have independent bank sub-accounts, allowing them to receive real-time information on the arrival of business charges from the bank independently, or to check the details of the arrival online in real time by logging into their personal bank accounts.',
                  '3. Legallinks is established and developed in Shanghai, and the client reception center and lawyer activity center provide a good reception and communication place for regional partners in Shanghai.',
                  '4. Providing support for lawyers with high business standards in specific professional fields, with certain professional influence and strong organizational and expansion capabilities, to apply for the formation of the legal affairs department or business department of Legallinks.',
                  '5. Regional Partners are responsible for the business operations, team management, incentive cooperation, case docking, public case allocation, and client legal services of the Legallinks system in their city.',
                ] :
                [
                  '1.通过律所OA、电子签章系统、电子开票系统和视频会议等线上办公途径，律师足不出户即可异地线上办理相应签约用章手续、正常业务办理等；',
                  '2.城市合伙人有独立的银行子账号，可以由本人实时接收银行的业务收费到账信息，或可通过登录银行个人账户，在网上实时查询到账明细；',
                  '3.上海嘉厚依托上海设立并发展起来，客户接待中心和律师活动中心能够为城市合伙人在上海提供良好的接待、交流场所；',
                  '4.为特定专业领域具有较高业务水准，有一定专业影响力，具有较强组织和拓展能力的律师申请组建嘉厚律师事务所法律事务部或业务部门提供支持；',
                  '5.城市合伙人负责嘉厚全系统在其所在城市的业务承接、团队管理激励合作、案源对接与公共案源的分配和客户法律服务等。'
                ]
          },
          {
            H2: lang == 'en' ? 'Ⅲ. The specific requirements of regional Partners:' : '三、城市合伙人的具体要求：',
            p:
              lang == 'en' ?
                [
                  '1. Compliance with the professional ethics and discipline of lawyers and acknowledge the business model and values of Legallinks.',
                  '2.Practice for more than 5 years (the years of working in corporate legal affairs or work of judges and prosecutors in judicial system can be counted as this practice requirement).',
                  '3.Outstanding professional strengths are preferred.',
                ] :
                [
                  '1.遵守律师职业道德和执业纪律，认可嘉厚律师事务所的业务模式及价值观。',
                  '2.执业5年以上（从事企业法务或司法系统工作的法官、检察官的岗位工作年限可计入此执业年限要求）；',
                  '3.专业特长突出优先；',
                ]
          }
        ]
      } else if (num == 2) {
        this.title = '事业合伙人'
        this.list = [
          {
            H2: lang == 'en' ? 'I.The Commission is entitled to the following treatments: ' : '一、提成律师可享受的待遇：',
            p:
              lang == 'en' ?
                [
                  '1. All lawyers are assigned a uniform standard of treatment, with no seat sharing cost, no mandatory cubicle and office rental requirements. ',
                  '2.Qualified lawyers can become partners of Legallinks after their application is approved, and enjoy the approved taxation policy for partners. ',
                  '3. In order to improve the academic background, scientific research strength, and guidance on difficult legal issues of Legallinks, college teachers engaged in the practice of law as part-time lawyers, with the premise of an online office, can enjoy the benefits of partnership (80%).%）；',
                ] : [
                  '1.所有合作律师分配待遇执行统一标准，不收取座位分摊成本，不要求强制租赁办公为和办公室。',
                  '2.符合嘉厚律所合伙人条件的律师，经申请通过后成为合伙人，享受合伙人税收核定征收政策；',
                  '3.为提高律所学术底蕴、科研实力，对疑难法律问题的指导，对于高校老师从事法律实践的兼职律师，在移动办公的前提下享受合伙人待遇（80%）；',
                ]
          },
          {
            H2: lang == 'en' ? 'Ⅱ. Legallinks online collaborative office mode:' : '二、嘉厚线上的协同办公模式：',
            p: lang == 'en' ?
              [
                '1. Through the online OA system, electronic signature system, electronic invoicing system, and video conferencing, lawyers can handle the corresponding contracting procedures and normal business processing remotely from home. ',
                '2. Legallinks is established and developed in Shanghai, and the client reception center and lawyer activity center can provide a good reception and communication place for regional partners in Shanghai. ',
                '3. Providing support for lawyers with high business standards in specific professional fields, with certain professional influence and strong organizational and expansion capabilities to apply for the formation of legal teams.',
              ] : [
                '1.通过律所OA、电子签章系统、电子开票系统和视频会议等线上办公途径，律师无需专程抵达上海，即可异地远程办理相应签约用章手续、正常业务办理等；',
                '2.上海嘉厚依托上海设立并发展起来，客户接待中心和律师活动中心，能够为城市合伙人在上海提供良好的接待、交流场所；',
                '3.为特定专业领域具有较高业务水准，有一定专业影响力，具有较强组织和拓展能力的律师组建并申请组建嘉厚律师事务所法律事务部或业务部门提供支持；',

              ]
          },
          {
            H2: lang == 'en' ? 'Ⅲ. The specific requirements of commissioned Lawyers:' : '三、合作律师的具体要求：',
            p: lang == 'en' ?
              [
                '1. Compliance with the professional ethics and practice discipline of lawyers and recognize the business model and values of Legallinks.',
                '2. Outstanding professional strengths are preferred.',
              ] : [
                '1.遵守律师职业道德和执业纪律，认可嘉厚律师事务所的业务模式及价值观。',
                '2.专业特长突出者优先。',
              ]
          }
        ]
      } else if (num == 3) {
        this.title = '授薪律师'
        this.list = [
          {
            H2: lang == 'en' ? 'I. Position Responsibility :' : '一、岗位职责:',
            p: lang == 'en' ?
              [
                '1. Major legal service areas: a rich variety of litigation cases of listed companies or large groups, arbitration and dispute resolution, etc..',
                '2. Independently undertake assigned cases under the guidance and requirements of the team and be responsible for the cases.',
                '3. Analyzing case situations, clarifying legal relationships, controlling the direction of litigation, and predicting case outcomes.',
                '4. Formulating litigation plans and issue litigation response strategies according to the court’s decision view and trial spirit.',
                '5. Drafting litigation materials, writing legal documents, participating in litigation and tribunal hearings to defend against the lawsuit.',
                '6. Responsible for the collection and collation of the cases and evidence materials..',
                '7. Responsible for researching legal issues of the case and searching for previous cases. ',
                '8. Responsible for case dispute trials, mediations, settlements, and participate or assist in dispute negotiations.',
                '9. Responsible for case maintenance and management, statistical analysis, summarization, organization, and report. ',
                '10.Tasks assigned by other departments of the law firm that must be completed in cooperation.'
              ] : [
                '1. 主要法律服务领域：丰富的各类上市公司或大型集团诉讼案件、仲裁与争议解决等；',
                '2. 在团队指导和要求下独立承办指派的案件，并对案件负责；',
                '3. 分析案件情况、厘清法律关系、把控诉讼走向并预判案件结果；',
                '4. 根据法院裁判观点、审判精神，制定诉讼方案与出具应诉策略；',
                '5. 起草诉讼材料、撰写法律文书，参加诉讼与仲裁庭审应诉抗辩；',
                '6. 负责案件、证据材料的收集整理、取证工作；',
                '7. 负责案件法律问题研究与既往案例检索工作；',
                '8. 负责案件纠纷的开庭、调解、和解，并参与或协助纠纷谈判；',
                '9. 负责案件维护与管理、统计、汇总、整理与汇报工作；',
                '10. 律所其他部门交待的必须配合完成任务或事务性工作。'
              ]
          },
          {
            H2: lang == 'en' ? ' Job Qualifications:' : '二、任职要求：',
            p: lang == 'en' ?
              [
                '1. Bachelor’s degree or above.',
                '2. A Lawyer’s License with no record of misconduct. ',
                '3. Excellent communication skills and written expression skills.',
                '4. Diligent in handling cases, and work under high intensity.',
                '5. Professional, practical, proactive, hard-working, quick-thinking, rigorous, meticulous, diligent, and progressive. ',
                '6. Passionate about litigation, aim to be a distinguished litigation attorney, and strive to be, be innovative and come up with best dispute resolution.'
              ] :
              [
                '1. 本科及以上学历，',
                '2. 律师执业证，且无不良执业记录；',
                '3. 具有出色沟通能力，文字表达能力优秀；',
                '4. 办案尽责勤勉，可适应高强度工作；',
                '5. 专注专业、工作踏实、积极主动、吃苦耐劳、思维敏捷、严谨细致、勤学上进；',
                '6. 热爱诉讼，有志于成为一名卓越诉讼律师，勇于创新并出具最佳争议解决方案。'
              ]
          },
          {
            H2: lang == 'en' ? ' III. Treatments and opportunities.' : '三、待遇与机会：',
            p: lang == 'en' ?
              [
                '1. Competitive treatment:: base salary + commission.+提成',
                '2. Wide development platform and promotion space: Junior Lawyer → Middle and Senior Lawyer →Regional Partners.',
                '3. Cross-learning promotion in various litigation practice departments to gain more learning and experience in various fields.',
                '4. Corporate lawyer team management mode and equipped with a perfect training and learning system, which will efficiently and comprehensively improve your legal expertise, case-handling skills, litigation and dispute resolution ability.',
                '5. Shanghai social security, points settlement, school procedures and medical care for children of migrant workers  and other related law firm assistance matters.',
                '6. The opportunity to cooperate with local public case sources, and reach major industry resources and client resources.',
                '7. The opportunity to receive good training and participate in various business exchanges, forum lectures, annual meetings, and other cultural and sports activities organized by the law firm is available through multi-level, extensive content, and flexible forms of training activities, allowing lawyers of all grades to remain in a continuous state of learning at any time.'
              ] : [
                '1. 具备竞争力的待遇：底薪+提成',
                '2. 广阔的发展平台与晋升空间：初级律师  → 中高级律师 → 城市合伙人；',
                '3. 各诉讼业务部交叉学习晋升，获得更多领域的学习和经验。',
                '4. 公司化律师团队管理模式并配备完善的培训与学习体系，将高效全面提升您的法律专业知识、办案技能、诉讼与争议解决能力；',
                '5.享受上海社保、积分落户、随迁子女就读及医疗等相关律所协助事宜；',
                '6.享受城市当地公共案源的合作机会，有机会接触并合作各大行业资源和客户资源：',
                '7.有机会获得良好的培训及参与律所组织的各类业务交流、论坛讲座、旅游年会等文体活动，通过多层次、内容广泛、形式灵活的培训活动，各年级的律师随时置身于持续的学习状态中。'
              ]
          }
        ]
      } else {
        this.title = '实习生'
        this.list = [
          {
            H2: lang == 'en' ? 'I. Position Responsibility :' : '一、岗位职责：',
            p: lang == 'en' ? [
              '1、 With the guidance of each lead attorney, learn and complete the auxiliary work of handling cases, such as laws and regulations and case law retrieval, legal documents writing, contract drafting and review, preparation before filing and trial, minutes of meetings, contact judges, etc..',
              '2、 Assist lawyers to go to court to file cases, transfer files and obtain evidence to various companies, deliver documents and information and other field work to various departments.',
              '3、 Assist lawyers in organizing and filing the volimes.',
              '4、 Other work arranged as needed.'
            ] : [
              '1、 在各带教律师的指导下，学习并完成办理案件辅助工作，如法律法规和判例检索，法律文书撰写，合同的草拟和审查，立案和开庭前准备、会议记录，联络法官等；',
              '2、 协助律师去法院立案，去各单位调档取证，去各单位或部门送取文件资料等外勤工作；',
              '3、 协助律师对卷宗进行整理、归档；',
              '4、 其他根据需要安排的工作。'
            ]
          },
          {
            H2: lang == 'en' ? 'Job Qualifications:' : '二、任职要求：',
            p: lang == 'en' ?
              [
                '1、 Integrity, interested in a long-term career as a lawyer.',
                '2、 Focus on professional, practical, proactive, hard-working, quick thinking, rigorous and meticulous, diligent and progressive, no gender restriction.',
                '3、 Strong sense of teamwork, good communication skills, interpersonal skills and continuous learning ability, with a high degree of execution and sense of responsibility.',
                '4、 With problem-solving ability, good at writing all kinds of official documents, good at information collection and integration, excellent language and writing expression.'
              ] : [
                '1、品行端正，有志于长期从事律师事业 ；',
                '2、 专注专业、工作踏实、积极主动、吃苦耐劳、严谨细致、勤学上进，男女不限；',
                '3、 团队合作意识强，具有良好的沟通能力、人际关系处理能力和持续学习能力，具有高度的执行力和责任感；',
                '4、 具备问题解决能力，擅于撰写各类公文写作，擅长信息搜集与整合，语言文字表达优秀；'
              ]
          },
          {
            H2: lang == 'en' ? 'Treatments and opportunities.' : '三、待遇与机会：',
            p: lang == 'en' ?
              [
                '1.Cross-learning in various litigation practice departments to gain more knowledge and experience in different areas.',
                '2.The corporate lawyer team management mode and equipped with comprehensive training and learning system, which will efficiently and comprehensively enhance your legal expertise, case handling skills, litigation and dispute resolution capabilities.',
                '3.The opportunity to be exposed to and learn industry knowledge and awareness of major industries.',
                '4.The opportunity to receive good training and participate in various business exchanges, forum lectures, annual meetings, and other cultural and sports activities organized by the law firm is available through multi-level, extensive content, and flexible forms of training activities, allowing lawyers of all grades to remain in a continuous state of learning at any time.'
              ] : [
                '1.各诉讼业务部交叉学习，获得更多领域的学习和经验。',
                '2.公司化律师团队管理模式并配备完善的培训与学习体系，将高效全面提升您的法律专业知识、办案技能、诉讼与争议解决能力；',
                '3.有机会接触并学习各大行业获得行业知识和认知；',
                '4.有机会获得良好的培训及参与律所组织的各类业务交流、论坛讲座、旅游年会等文体活动，通过多层次、内容广泛、形式灵活的培训活动，各年级的律师随时置身于持续的学习状态中。'
              ]
          }
        ]
      }
    },

    navOpenRight() {
      this.isRight = true
    },
    navCloseRight() {
      this.isRight = false
    }

  }

})