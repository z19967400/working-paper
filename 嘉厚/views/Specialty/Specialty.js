var app = new Vue({
  el: '#app',
  data: {
    show: false,
    isRight: false,
    index: 0,
    textData: {
      title: '',
      text: ''
    },
    textList: [
      {
        title: '互联网',
        text: `
        我们提供的法律服务
            <br/><br/>
            1.为游戏企业、影视传媒企业、 MCN机构视频、直播平台、直播电商等互联网行业公司提供综合法律服务；
            <br/><br/>
            2.提供综合合规服务，在网络安全领域、个人信息与数据合规领域、网络信息内容合规、电子商务领域、广告合规、AI算法合规等领域提供法律培训讲座、制度及合规手册建立、协助部门约谈、综合平台治理、尽职调查、互联网侵权、反不正当竞争等法律服务，以及与电信、互联网、高科技相关的知识产权保护、争议解决和风险防范；
            <br/><br/>
            3.为互联网企业提供全生命周期一站式诉调一体服务方案。'
            `,
        text2: `
          We provide the following legal services<br/><br/>
          1. Comprehensive legal services to companies in the Internet industry, such as game companies, film and media companies, MCN entity, live streaming platforms, live e-commerce, etc.<br/><br/>
          2. Comprehensive compliance services, such as legal training lectures, regulations,  compliance manual, internal department interviews, comprehensive platform governance, due diligence, Internet infringement. , anti-unfair competition etc, as well as  telecommunications, Internet, high-tech related intellectual property protection, dispute resolution and risk prevention, in the field of network security, personal information and data compliance, network information content compliance, e-commerce, advertising compliance, AI algorithm compliance etc..<br/><br/>
          3. One-stop full life cycle solutions of integrated litigation and mediation service  for the Internet enterprises.
        `
      },
      {
        title: '电商',
        text: '我们提供的法律服务<br/><br/>1.审阅、起草与电子商务有关的商业合作协议、用户和服务协议、网站开发协议、广告投放协议、网络托管协议、应用服务提供商协议、云服务协议等；<br/><br/>2.根据电子商务公司特殊应用场景提出针对性的网络安全及个人信息保护合规建议，起草、审阅相关隐私政策；<br/><br/>3.对电子商务公司可能遇到的知识产权、侵权、合同等纠纷提供诉讼或仲裁服务。',
        text2: `
          We provide the following legal services<br/><br/>
          1. Reviewing and drafting e-commerce related business cooperation agreements, user and service agreements, website development agreements, advertising placement, web hosting agreements, application service provider agreements, cloud service agreements, etc.<br/><br/>
          2. Compliance sugguestions on network security and personal information protection, according to the e-commerce companies' special application scenarios, and draft and review relevant privacy policies.<br/><br/>
          3. Litigation or arbitration services for intellectual property rights, infringement, contract and other disputes that e-commerce companies may encounter.
        `
      },
      {
        title: '保险',
        text: '我们提供的法律服务<br/><br/>1.为保险公司及其分支机构、保险中介机构的设立、合并、分立、变更、解散、清算、注销等提供咨询、代理以及其它相关服务；<br/><br/>2.担任保险公司及其分支机构和保险中介机构的常年法律顾问，为其经营管理、保险产品的开发、保险方案的设计、重大保险合同的审查、保险的资信调查、保险损失的理赔、诉责险法律审查、保险争议的调解等提供全方位的法律服务；<br/><br/>3.代理各类保险纠纷，如再保险纠纷、责任保险抗辩、保险代位求偿等仲裁或诉讼案件。',
        text2: `
          We provide the following legal services<br/><br/>
          1. Consultation, agency and other related services for the establishment, merger, demerger, change, dissolution, liquidation and cancellation of insurance companies, their branches and insurance intermediaries.<br/><br/>
          2. Permanent legal adviser of insurance companies and their branches and insurance intermediaries, providing comprehensive legal services for their operation and management, development of insurance products, design of insurance schemes, review of major insurance contracts, credit investigation of insurance, settlement of insurance losses, legal review of liability insurance, mediation of insurance disputes, etc.<br/><br/>
          3. Agencies for all kinds of insurance disputes, such as reinsurance disputes, liability insurance defense, insurance subrogation claims and other arbitration or litigation cases.
        `
      },
      {
        title: '银行',
        text: '我们提供的法律服务<br/><br/>1.银团贷款及银行其他各类抵押融资贷款；<br/><br/>2.银行金融创新产品合规性审査；<br/><br/>3.银行分支机构设立、变更尽职调査；<br/><br/>4.银行间并购；<br/><br/>5.商业银行定向发行股份；<br/><br/>6.银行破产重整；<br/><br/>7.金融不良资产交易尽职调查、处置，诉讼一体化服务；<br/><br/>8.个人房地产信贷催收；<br/><br/>9.信用卡催收；<br/><br/>10.其他类型金融借款纠纷争议解决。',
        text2: `
        We provide the following legal services<br/><br/>
        1. Syndicated loans and other kinds of mortgage financing loans.<br/><br/>
        2. Compliance audit of banks' financial innovation products.<br/><br/>
        3. Due diligence investigation on the establishment and change of bank branches.<br/><br/>
        3. Inter-bank mergers and acquisitions.<br/><br/>
        4. Directed share issuance by commercial banks.<br/><br/>
        5. Bankruptcy restructuring.<br/><br/>
        6. Integrated services of financial distressed assets transaction due diligence, disposal and litigation.<br/><br/>
        7. Personal real estate trusts loan collection.<br/><br/>
        8. Credit card debt collection.<br/><br/>
        9. Other types of financial loan dispute resolution.<br/><br/>
        `
      },
      {
        title: '汽车金融',
        text: '我们提供的法律服务<br/><br/>1.基于汽车金融公司的特别准入制度，协助设立或并购汽车金融公司；<br/><br/>2.按照中国银保监会对于汽车金融公司内控指引和风险管理指引的要求，协助建立健全公司治理和内部控制制度，建立全面有效的风险管理体系；<br/><br/>3.制定与业务外包相关的政策和管理制度，包括业务外包的决策程序、对外包方的评价和管理、控制业务信息保密性和安全性的措施和应急计划等；<br/><br/>4.汽车贷款业务中个人借款人、经销商或机构借款人资质审核、信贷档案建立及更新、信用评级系统建立；<br/><br/>5.汽车金融全周期诉调一体争议纠纷处理。',
        text2: `
        We provide the following legal services
        <br/><br/>
        1. Assisting in the establishment or merger and acquisition of auto finance companies based on the special admission system for auto finance companies.
        <br/><br/>
        2. Assisting in the establishment of a sound corporate governance and internal control system and a comprehensive and effective risk management system in accordance with the requirements of the China Banking and Insurance Regulatory Commission for the internal control guidelines and risk management guidelines for auto finance companies.
        <br/><br/>
        3. Formulating policies and management systems related to business outsourcing, including decision-making procedures for business outsourcing, evaluation and management of outsourcing parties, measures to control the confidentiality and security of business information and contingency plans, etc.
        <br/><br/>
        4. Qualification review of individual borrowers, dealers or institutional borrowers in auto loan business, credit file establishment and update, and credit rating system establishment.
        <br/><br/>
        5. Auto finance full-cycle litigation and mediation in one dispute resolution.
        `
      },
      {
        title: '房地产与建设工程',
        text: '我们提供的法律服务<br/><br/>1.建设工程结算、索赔等争议解决；<br/><br/>2.酒店应收款项处理及争议解决；<br/><br/>3.重大疑难地产诉讼争议解决；<br/><br/>4.境内外建设工程与房地产纠纷争议解决；<br/><br/>5.建设工程项目管理制度法律服务；<br/><br/>6.建设工程项目开发建设法律服务；<br/><br/>7.建设工程项目融资法律服务；<br/><br/>8.建筑企业常年法律顾问服务；<br/><br/>9.建设工程争议解决法律服务；<br/><br/>10.房地产销售法律服务。',
        text2: `
        We provide the following legal services
        <br/><br/>
        1. Construction project settlement, claims and other dispute resolution. <br/><br/>
        2. Hotel AR and dispute resolution. <br/><br/>
        3. Dispute resolution of major and difficult real estate litigation. <br/><br/>
        4. Domestic and overseas construction engineering and real estate disputes resolution. <br/><br/>
        5. Legal services of construction projects management system. <br/><br/>
        6. Legal services for the development and construction of construction projects. <br/><br/>
        7. Construction project financing legal services. <br/><br/>
        8. Year-round legal consultancy services for construction enterprises. <br/><br/>
        9. Legal service for construction project dispute resolution. <br/><br/>
        10. Legal service for real estate sales. <br/><br/>
        `
      },
      {
        title: '医疗卫生或健康产业',
        text: '我们提供的法律服务<br/><br/>1.医药企业海外投资、并购法律服务；<br/><br/>2.医疗器械企业、医疗机构、医养结合机构、卫生行政部门法律服务与药物研发、技术许可转让、合规咨询等相关的政府调查、行政处罚、民事纠纷处理等；<br/><br/>3.企业并购投资、员工股权激励、公司解散清算破产等各类争议解决；<br/><br/>4.医药医疗企业日常经营相关常年法律顾问服务。',
        text2: `
        We provide the following legal services
        <br/><br/>
        1. Legal services for overseas investment and M&A of pharmaceutical enterprises.
        <br/><br/>
        2. Legal services for medical device enterprises, medical institutions, medical and health care institutions, health administration departments and drug research and development, technology license transfer, compliance consulting and other related government investigations, administrative penalties, civil dispute handling, etc..
        <br/><br/>
        3. Enterprise mergers and acquisitions, investment, employee equity incentives, company dissolution liquidation bankruptcy and other types of dispute resolution.
        <br/><br/>
        4. Medical and pharmaceutical enterprises daily operation related to perennial legal advisory services.
         `
      },
      {
        title: '制造业',
        text: '我们提供的法律服务<br/><br/>为工业制造行业的企业客户提供投融资、税务、合规咨询、知识产权、劳动人事、商事争议解决等全方位、一体化法律服务，推进工业制造行业在全球经济一体化进程中健康长足发展，助力企业客户实现其商业价值和愿景。',
        text2: `
        We provide the following legal services
        <br/><br/>
        We provide comprehensive and integrated legal services for corporate clients in the industrial manufacturing industry, including investment and financing, taxation, compliance consulting, intellectual property, labor and personnel, and commercial dispute resolution, to promote the healthy and long-term development of the industrial manufacturing industry in the process of global economic integration and help corporate clients realize their business values and visions.
        `
      },
      {
        title: '物流',
        text: '我们提供的法律服务<br/><br/>1.协助服务企业加强和规范内部管理，就企业经营和业务的有关法律问题提供法律咨询和建议，参与企业经济合同以及其他有关法律事务文书草拟，协助企业完善和加强挂靠车辆与企业之间的经营管理关系，及时到场协助企业解决突发性重大法律事件，清理企业历年债权债务及资产负债结构，接受委托代表企业参与被诉交通事故、货物运输事故的诉讼、调解和仲裁活动，接受委托代表企业参与与其他第三人之间、行政管理机关之间的民事、行政争议的诉讼、调解、仲裁事务，对企业挂靠车辆车主进行相关的法律知识辅导，不定时提供与经营和业务相米的法律信息，提供挂靠车主法律风险防范意识。<br/><br/>2.为挂靠车辆、公司合同事务、公司货物运输、公司应收账款等提供专项法律服务。',
        text2: `
        We provide the following legal services
        <br/><br/>
        1. Assist service enterprises to strengthen and standardize internal management, provide legal advice and suggestions on legal issues related to enterprise operation and business, participate in drafting of enterprise economic contracts and other related legal affairs instruments, assist enterprises to improve and strengthen the operation and management relationship between affiliated vehicles and enterprises, arrive in time to assist enterprises to solve sudden and major legal events, clean up the structure of enterprises' historical debts and assets and liabilities. 
        The company is entrusted to participate in the litigation, mediation and arbitration activities of traffic accidents and cargo transportation accidents on behalf of the enterprise, to participate in the litigation, mediation and arbitration of civil and administrative disputes with other third parties and between administrative organs, to counsel the owners of affiliated vehicles of the enterprise on relevant legal knowledge, to provide from time to time legal information related to the operation and business, to provide the owners of dependent vehicles with legal Risk prevention awareness.
        <br/><br/>
        2. Provide special legal services for affiliated vehicles, company contract affairs, company cargo transportation, company accounts receivable, etc.
        `
      },
      {
        title: '消费与零售',
        text: '我们提供的法律服务<br/><br/>为消费品和零售领域的客户提供全方位的法律意见，包括：<br/><br/>1.商业协议，包括服务、外包、制造、供应和分销协议；<br/><br/>2.知识产权事务，包括知识产权组合管理、品牌管理、品牌重塑战略、许可协议；3.研发合作、合资企业、战略联盟和融资安排；<br/><br/>4.公司交易，包括并购、私募股权和合资企业；<br/><br/>5.协助行业客户预防和化解各类法律纠纷，包括代表消费与零售行业的客户处理相关争议和纠纷（包括各类合同纠纷、加盟经销纠纷、产品质量纠纷、食药品安全纠纷、品牌保护纠纷、消费者权益保护纠纷、人事劳动纠纷等），并从纠纷预防机制建立、纠纷管控手段完善、纠纷应对和处置多元化等方面入手，竭力维护客户合法权益。<br/><br/>服务覆盖消费品和零售行业的全部细分领域，包括广告与市场营销、博彩和游戏（电信、传媒、娱乐和高科技等）、时尚、快速消费品、食品及饮料、零售等领域。',
        text2: `We provide the following legal services
        <br/><br/>
        Providing a full range of legal advice to clients in the consumer goods and retail sectors, including:  <br/><br/>
        1. Commercial agreements, including service, outsourcing, manufacturing, supply and distribution agreements. <br/><br/>
        2. Intellectual property matters, including intellectual property portfolio management, brand management, rebranding strategies, and licensing agreements. <br/><br/>
        3. R&D collaborations, joint ventures, strategic alliances and financing arrangements. <br/><br/>
        4. Corporate transactions, including mergers and acquisitions, private equity and joint ventures. <br/><br/>
        5. Assisting clients in the industry to prevent and resolve various legal disputes, including representing clients in the consumer and retail industry to deal with related disputes and controversies (including various contract disputes, franchise distribution disputes, product quality disputes, food and drug safety disputes, brand protection disputes, consumer rights and interests protection disputes, personnel and labor disputes, etc.), and from the establishment of dispute prevention mechanisms, dispute control means improvement, dispute response and disposal We make every effort to protect the legitimate rights and interests of our clients by establishing dispute prevention mechanisms, improving dispute control methods, and diversifying dispute response and disposal.
        <br/><br/>
        Our services cover all segments of the consumer goods and retail industry, including advertising and marketing, gaming and games (telecom, media, entertainment and high-tech, etc.), fashion, FMCG, food and beverage, retail, etc.`
      },
      {
        title: '诉讼与仲裁',
        text: '我们提供的法律服务<br/><br/>1.诉讼案件诉前谈判法律服务；<br/><br/>2.诉讼及商事仲裁法律服务，包括但不限于民、商事诉讼、行政复议、行政诉讼、国内、国际商事仲裁、劳动争议仲裁等，代理国内、外国公司或外商投资企业在国内的诉讼活动以及各种替代性争议解决、研发合作、合资企业、战略联盟和融资安排<br/><br/>3.代理客户参加诉前、诉中、执行、调解、谈判等各阶段流程。',
        text2: `
        We provide the following legal services
        <br/><br/>
        1. Legal services for pre-litigation negotiation of litigation cases.
        <br/><br/>
        2. Legal services for litigation and commercial arbitration, including but not limited to civil and commercial litigation, administrative reconsideration, administrative litigation, domestic and international commercial arbitration, labor dispute arbitration, etc., representation of domestic and foreign companies or foreign-invested enterprises in domestic litigation activities and various alternative dispute resolution, R&D cooperation, joint ventures, strategic alliances and financing arrangements.
        <br/><br/>
        3. Representing clients in all stages of the process, including pre-litigation, litigation, enforcement, mediation and negotiation.
        `
      },
      {
        title: '公司法律顾问',
        text: '我们提供的法律服务<br/><br/>1.起草、审阅及修改日常经营业务合同，包括业务合作协议、经销协议、采购合同、销售合同、服务合同、保密协议、许可协议及其它法律文件；<br/><br/>2.分析、解答外商投资企业经营中遇到的知识产权、劳动、税务及环境保护等各种法律问题，协助客户处理一般的劳动人事纠纷；<br/><br/>3.在诉讼、仲裁发生前协助客户处理纠纷和争议，并代表客户向第三方出具律师函、催告函等文件；<br/><br/>4.协助客户健全各项内部规章制度；<br/><br/>5.就客户的重大经营活动，参与项目策划、设计方案、参与商务谈判以及提供程序性协助与服务；<br/><br/>6.就客户的重要民商事活动提供律师见证服务；<br/><br/>7.协助客户进行危机处理；<br/><br/>8.为客户关注的热点法律问题提供法律评论和法律培训；<br/><br/>9.向客户提供中国法律法规及政策变化的最新信息；<br/><br/>10.就客户日常经营的法律及合规问题提供咨询意见。',
        text2: `
        We provide the following legal services
        <br/><br/>
        1.Drafting, reviewing and revising daily business contracts, including business cooperation agreements, distribution agreements, procurement contracts, sales contracts, service contracts, confidentiality agreements, licensing agreements and other legal documents.
        <br/><br/>
        2.Analyzing and answering various legal issues encountered in the operation of foreign-invested enterprises, such as intellectual property rights, labor, taxation and environmental protection, and assist clients in handling general labor and personnel disputes.
        <br/><br/>
        3.Assisting clients in resolving disputes and controversies before litigation and arbitration occur, and issuing attorney letters, reminders and other documents to third parties on behalf of clients.
        <br/><br/>
        4.Assisting clients to improve various internal rules and regulations.
        <br/><br/>
        5.Participating in project planning, designing proposals, participating in business negotiations and providing procedural assistance and services in relation to the client's major business activities.
        <br/><br/>
        6.Providing attorney witnessing services in relation to the client's important civil and commercial activities.
        <br/><br/>
        7.Assisting clients in crisis management.
        <br/><br/>
        8.Providing legal commentary and legal training on hot legal issues of concern to clients.
        <br/><br/>
        9.Providing clients with the latest information on changes in Chinese laws and regulations and policies.
        <br/><br/>
        10.Providing advice on legal and compliance issues of clients' daily operations.
        `
      },
      {
        title: '知识产权',
        text: '我们提供的法律服务<br/><br/>1.知识产权民事诉讼；<br/><br/>2.不正当竞争与商业秘密诉讼；<br/><br/>3.协助调查取证；<br/><br/>4.陪同投诉查处约谈；<br/><br/>5.知识产权合规服务；<br/><br/>6.涉外知识产权服务；<br/><br/>7.知识产权专项服务；<br/><br/>8.知识产权刑事保护；<br/><br/>9.知识产权行政及海关保护；<br/><br/>10.与知识产权有关的反垄断案件；<br/><br/>11.域名争议解决；<br/><br/>12.知识产权项目申请与申报。',
        text2: `
        We provide the following legal services
        <br/><br/>
        1. Civil litigation on intellectual property rights.<br/><br/>
        2. Unfair competition and trade secret litigation.<br/><br/>
        3. Assistance in investigation and evidence collection.<br/><br/>
        4. Accompanying complaint investigation and interview.<br/><br/>
        5. IPR compliance services.<br/><br/>
        6. Foreign-related intellectual property services.<br/><br/>
        7. Special services for intellectual property rights.<br/><br/>
        8. Criminal protection of intellectual property rights.<br/><br/>
        9. IPR administrative and customs protection.<br/><br/>
        10. IP-related antitrust cases.<br/><br/>
        11. Domain name dispute resolution.<br/><br/>
        12. IPR project application and declaration.<br/><br/>
        `
      },
      {
        title: '家事与财富传承',
        text: '我们提供的法律服务<br/><br/>1.企业与家族财富<br/><br/>就企业的设立提供建议；<br/>公司上市前筹划和上市后规范管理；<br/>公司股权梳理及治理结构优化；<br/>通过家族协议促进家族成员参与、管理和拥有企业；<br/>企业家家事管理，含财产/债务配置方案设计等；<br/>家族及家族企业财富管理，含管理传承体系设计、股权架构设置、信托设计、保险配置、移民方案等；<br/>常年私人/家族家事法律顾问服务。<br/><br/>2.财富传承规划<br/><br/>高净值家庭的婚姻财富规划；<br/>婚前和婚姻协议；<br/>高净值家庭财富传承规划；<br/>跨境遗嘱方案的规划设计；<br/>公司股权传承方案；<br/>针对企业传承给家庭成员或对外出售提供建议；<br/>财富传承综合方案；<br/>婚前/后夫妻财产约定、赠与、遗嘱、意定监护协议、养老协议等文书草拟和签订指导。<br/><br/>3.税务<br/><br/>对交易和运营税务影响的分析；<br/>就企业、个人以及交易的税务问题提供建议；<br/>设计必要的文件和结构，实现税务合规。<br/><br/>4.争议解决<br/><br/>跨国/域 婚姻及财产纠纷争议解决；<br/>跨国/域 继承及遗产纠纷争议解决；<br/>婚恋、同居、离婚、亲子关系、子女抚养等争议解决，含代理谈判、调解、诉讼；<br/>遗嘱、遗赠、继承等纠纷争议解决，含代理谈判、调解、诉讼；<br/>申请承认和执行外国法院或仲裁机构的民事判决、裁定。',
        text2: `
        We provide the following legal services
        <br/><br/>
        1.Enterprises and family wealth<br/>
        Advising on the establishment of enterprises.<br/>
        Pre-IPO planning and post-IPO regulatory management of companies.<br/>
        Corporate shareholding sorting and optimization of governance structure.<br/>
        Facilitating the participation, management and ownership of businesses by family members through family agreements.<br/>
        Entrepreneurial family management, including the design of property/debt allocation schemes, etc.<br/>
        Family and family enterprise wealth management, including management inheritance system design, equity structure setting, trust design, insurance allocation, immigration solutions, etc.<br/>
        Year-round private/family legal counseling services.
        <br/><br/>
        2. Wealth inheritance planning<br/>
        Marital wealth planning for high net worth families.<br/>
        Premarital and marital agreements.<br/>
        Wealth transmission planning for high net worth families.<br/>
        Planning and design of cross-border probate programs.<br/>
        Corporate equity succession planning.<br/>
        Advice for passing on a business to family members or for external sale.<br/>
        Comprehensive wealth transmission programs.<br/>
        Guidance on drafting and signing instruments such as pre/post-marital spousal property agreements, gifts, wills, intended guardianship agreements, and pension agreements.
        <br/><br/>
        3. Tax
        <br/>
        Analysis of the tax implications of transactions and operations.<br/>
        Advising on corporate, individual and transactional tax issues.<br/>
        Designing the necessary documentation and structures to achieve tax compliance.
        <br/><br/>
        4.Dispute Resolution<br/>
        Dispute resolution for cross-border/domestic matrimonial and property disputes.<br/>
        Cross-border/domestic inheritance and estate dispute resolution.<br/>
        Dispute resolution of marriage, cohabitation, divorce, paternity and child support, including representation in negotiation, mediation and litigation.<br/>
        Dispute resolution of wills, bequests, inheritance and other disputes, including agency negotiation, mediation and litigation.<br/>
        Application for recognition and enforcement of civil judgments and rulings of foreign courts or arbitration bodies.<br/>
        `
      },
      {
        title: '不良资产',
        text: '我们提供的法律服务<br/><br/>可熟练使用中文和英文向境内外银行业金融机构、资产管理公司、机构投资者等各类客户在不良资产、困境资产等特殊机遇投资领域提供全方位的法律咨询、交易及清收处置等法律服务，具体服务范围可包括：<br/><br/>1.为不良资产及困境资产的投资提供法律咨询；<br/>2.对不良资产包进行法律尽职调查；<br/>3.参与不良资产包的转让交易；<br/>4.参与不良资产包的清收处置（包括诉讼、仲裁、保全、执行等清收方式）等。<br/><br/>此外，还可以为同时涉及不良资产与其他专业领域的交叉业务提供法律服务，例如设立和发行不良资产专项基金、不良资产证券化交易等。',
        text2: `
        We provide the following legal services
        <br/> <br/>
        We can proficiently use Chinese and English to provide a full range of legal services such as legal consultation, transaction and liquidation and disposal to various clients such as domestic and foreign banking and financial institutions, asset management companies and institutional investors in the field of special opportunity investment such as non-performing assets and troubled assets, and the specific scope of services can include 
        <br/> <br/>
        1. Providing legal consultation for investment in non-performing assets and distressed assets. <br/>
        2. Conducting legal due diligence on distressed asset packages. <br/>
        3. Participating in the transfer transaction of distressed asset packages. <br/>
        4. Participating in the liquidation and disposal of distressed asset packages (including litigation, arbitration, preservation, enforcement and other liquidation methods), etc.
        <br/> <br/>
        In addition, we can also provide legal services for cross business involving both non-performing assets and other specialized fields, such as the establishment and issuance of special funds for non-performing assets, securitization transactions of non-performing assets, etc.
        `
      },
      {
        title: '政府与公共法律服务',
        text: '我们提供的法律服务<br/><br/>1.公共法律服务平台等基本公共法律服务网络提供；<br/><br/>2.接待、解答司法行政其他相关业务咨询，引导相关服务；<br/><br/>3.法治宣传教育；<br/><br/>4.通过网络、热线、现场咨询等提供的法律咨询、法律指引等服务；<br/><br/>5.法律服务机构、法律服务人员信息，服务事项办事指南，以及公共法律服务业务进展查询服务；<br/><br/>6.法律援助服务；<br/><br/>7.人民调解服务；<br/><br/>8.律师辩护或者代理、公证、司法鉴定、行政复议、仲裁等法律事务办理指引；<br/><br/>9.村（居）法律顾问服务；<br/><br/>10.国家和省规定的其他基本公共法律服务。',
        text2: `
        We provide the following legal services
        <br/> <br/>
        1. Public legal service platform and other basic public legal service network provision.<br/>
        2. Reception and answering of other related business inquiries of judicial administration and guidance of related services.<br/>
        3. Rule of law publicity and education.<br/>
        4. Legal advice, legal guidance and other services provided through the network, hotline, on-site consultation, etc.<br/>
        5. Information on legal service institutions, legal service personnel, service matters office guide, and public legal service business progress inquiry services.<br/>
        6. Legal aid services.<br/>
        7. People's mediation services.<br/>
        8. Lawyer defense or agency, notary, judicial appraisal, administrative reconsideration, arbitration and other legal affairs handling guidelines.<br/>
        9. Village (residence) legal adviser services.<br/>
        10. Other basic public legal services provided by the state and the province.<br/>
        
        `
      },
      {
        title: '刑事辩护',
        text: '我们提供的法律服务<br/><br/>1.接受国家机关、企事业单位、各种社团法人的聘请，进行职务犯罪预防、高管执业刑事风险防控培训。<br/><br/>2.在侦查阶段为当事人提供法律帮助：会见犯罪嫌疑人，了解涉嫌罪名和有关案件的情况，为犯罪嫌疑人提供法律咨询，为犯罪嫌疑人申请取保候审，代理申诉和控告。<br/><br/>3.在审判阶段为被告人辩护 ：在一审、二审过程中查阅、摘抄、复制案件有关材料，与被告人会见和通信，调查和收集证据，参加法庭审理，提出被告人无罪或罪轻的辩护意见。<br/><br/>4.在死刑复核阶段为被告人辩护：与被告人会见和通信，调查和收集证据，提出被告人无罪或罪轻或不应核准死刑的辩护意见。<br/><br/>5.代理申诉案件：代为制作申诉材料，代为再审立案，参与再审案件的辩护。<br/><br/>6.法治宣传教育。',
        text2: `
        We provide the following legal services
        <br/> <br/>
        1. Accepting the engagement of state organs, enterprises and institutions, and various association legal persons to conduct training on the prevention of job-related crimes and the prevention and control of criminal risks in the practice of executives.
        <br/> <br/>
        2. Providing legal assistance to clients in the investigation stage: meet with criminal suspects, understand the suspected crime and the situation of the case concerned, provide legal advice to criminal suspects, apply for bail pending trial for criminal suspects, and act as an agent for complaints and charges.
        <br/> <br/>
        3. Defending the defendant at the trial stage: reviewing, extracting and copying relevant materials of the case during the first and second trials, meeting and corresponding with the defendant, investigating and collecting evidence, participating in court hearings, and putting forward the defense of the defendant's innocence or misdemeanor.
        <br/> <br/>
        4. Defending the defendant in the death penalty review stage: meeting and corresponding with the defendant, investigating and collecting evidence, and presenting the defense opinion that the defendant is not guilty or guilty of a minor crime or that the death penalty should not be approved.
        <br/> <br/>
        5. Representation of complaint cases: making complaint materials on behalf of the defendant, filing cases for retrial, and participating in the defense of retrial cases.
        <br/> <br/>
        6. Rule of law publicity and education.
        
        `
      },
      {
        title: '合规',
        text: '我们提供的法律服务<br/><br/>1.企业合规体系建设；<br/><br/>2.个人隐私、数据保护和网络安全合规；<br/><br/>3.反商业贿赂、反不正当竞争、反垄断政策合规；<br/><br/>4.环境、安全与健康合规；<br/><br/>5. 税务合规；<br/><br/>6.合同及内控制度合规；<br/><br/>7.劳动及人事政策合规；<br/><br/>8.针对特定行业的合规事项。',
        text2: `
        We provide the following legal services
        <br/> <br/>
        1. Corporate compliance system building.
        <br/> <br/>
        2. Personal privacy, data protection and network security compliance.
        <br/> <br/>
        3. Anti-commercial bribery, anti-unfair competition and anti-monopoly policy compliance.
        <br/> <br/>
        4. Environmental, safety and health compliance.
        <br/> <br/>
        5. Tax compliance.
        <br/> <br/>
        6. Contract and internal control system compliance.
        <br/> <br/>
        7. Labor and personnel policy compliance.
        <br/> <br/>
        8. Industry-specific compliance matters.

        `
      },
      {
        title: '劳动',
        text: '我们提供的法律服务<br/><br/>1.在全国主要城市协助客户解决各类劳动争议（包括复杂案件及集体案件），包括但不限于代理客户参加劳动争议调解、仲裁与诉讼；<br/><br/>2.起草或审阅劳动合同、培训协议、竞业限制协议及保密协议等各类与人力资源管理相关的协议和文件；<br/><br/>3.起草或审阅集体合同，参加集体协商；<br/><br/>4.起草或审阅员工手册和公司内部规章制度；<br/><br/>5. 就劳动法专项问题和热点问题提供培训；<br/><br/>6.就劳动保护、工伤和职业病等问题提供咨询意见；<br/><br/>7.协助办理外籍员工的工作签证和其他就业手续；<br/><br/>8.就社会保险、商业保险和各类福利计划提供咨询意见；<br/><br/>9.设计企业在并购、重组或清算过程中的涉及的人员安置或人员转移方案，参与谈判，并起草或审阅相关项目文件；<br/><br/>10.就员工股权激励计划问题提供咨询意见；<br/><br/>11.就个人信息保护问题提供咨询意见；<br/><br/>12.就反职场性骚扰和反就业歧视等问题提供咨询意见；<br/><br/>13.协助企业进行合规调查，并就处理存在合规问题的员工提供咨询意见。',
        text2: `
        We provide the following legal services
        <br/> <br/>
        1. Assisting clients in resolving various types of labor disputes (including complex cases and group cases) in major cities across China, including but not limited to representing clients in labor dispute mediation, arbitration and litigation.
        <br/> <br/>
        2. Drafting or reviewing various agreements and documents related to human resources management, including labor contracts, training agreements, non-compete agreements and confidentiality agreements.
        <br/> <br/>
        3. Drafting or reviewing collective contracts and participating in collective bargaining.
        <br/> <br/>
        4. Drafting or reviewing employee handbooks and internal company rules and regulations.
        <br/> <br/>
        5. Providing training on special issues and hot issues of labor law.
        <br/> <br/>
        6. Providing advice on labor protection, work-related injuries and occupational diseases.
        <br/> <br/>
        7. Assisting in the processing of work visas and other employment procedures for foreign employees.
        <br/> <br/>
        8. Advising on social insurance, commercial insurance and various welfare plans
        <br/> <br/>
        9. Designing personnel relocation or personnel transfer plans involved in the process of mergers, acquisitions, restructuring or liquidation of enterprises, participating in negotiations, and drafting or reviewing relevant project documents.
        <br/> <br/>
        10. Providing advice on employee equity incentive plan issues.
        <br/> <br/>
        11. Advising on personal information protection issues.
        <br/> <br/>
        12. Advising on issues such as anti-workplace sexual harassment and anti-discrimination in employment
        <br/> <br/>
        13. Assisting companies in conducting compliance investigations and advising on handling employees with compliance issues.
        `
      },
      {
        title: '执行',
        text: '我们提供的法律服务<br/><br/>1.对被执行人财产线索深度挖掘，并对挖掘到的财产线索进行多个层级的筛选及分析，为每一个案件在不同阶段匹配最优质的财产线索；<br/><br/>2.撰写执行中所需的各种类型的文书，并对最高院及各地方高院的执行政策进行深度研究，为不同区域的案件制作与当地法院最匹配的文书样本；<br/><br/>3.及时对接法院采取查询、保全等措施，高效推动办案进程；<br/><br/>4.对债务人的经营状况、履行能力进行精准分析和判断，为每个案件设计最适合的执行方案；<br/><br/>5. 准确应对执行中出现的异议、复议及异议之诉。',
        text2: `
        We provide the following legal services
        <br/> <br/>
        1. Deep excavation of property clues of the executee, and multiple levels of screening and analysis of the excavated property clues to match the best quality property clues for each case at different stages.
        <br/> <br/>
        2. Writing various types of documents required in the execution, and conduct in-depth research on the execution policies of the Supreme Court and various local high courts to produce sample documents that best match the local courts for cases in different regions.
        <br/> <br/>
        3. Timely docking with the court to take measures such as inquiry and preservation to efficiently promote the case handling process.
        <br/> <br/>
        4. Accurately analyzing and judging the debtor's business status and ability to perform, and design the most suitable execution plan for each case.
        <br/> <br/>
        5. Accurately responding to objections, reconsiderations and lawsuits of objections arising in the execution.
        `
      },
      {
        title: '破产',
        text: '我们提供的法律服务<br/><br/>1.担任债务人或债权人的法律顾问或代理人；<br/><br/>2.担任破产企业股东的法律顾问或代理人；<br/><br/>3.代理境内外当事人与破产企业处理继续履行合同事宜与破产有关的纠纷案件的代理；<br/><br/>4.担任重整程序中战略投资者的法律顾问；<br/><br/>5. 担任企业破产清算、重整与和解程序中资产收购方的法律顾问或代理人。<br/><br/>6.为企业提供有关破产、清算方面的法律意见；<br/><br/>7.协助资产处理、债务重组；<br/><br/>8.提供融资、并购方案，并协助实施；<br/><br/>9.协助引入外部投资者，实施企业重组。',
        text2: `
        We provide the following legal services
        <br/> <br/>
        1. Acting as legal counsel or agent for debtors or creditors.
        <br/> <br/>
        2. Acting as legal counsel or agent for shareholders of bankrupt enterprises.
        <br/> <br/>
        3. Acting for domestic and foreign parties in matters relating to the continuation of contracts with the bankrupt enterprise and in cases of disputes relating to bankruptcy.
        <br/> <br/>
        4. Acting as legal counsel in strategic investments in reorganization proceedings
        <br/> <br/>
        5. Acting as legal advisor or agent for the acquirer of assets in the bankruptcy liquidation, reorganization and settlement proceedings of an enterprise
        <br/> <br/>
        6. Providing legal opinions on bankruptcy and liquidation for enterprises.
        <br/> <br/>
        7. Assisting in asset disposal and debt restructuring.
        <br/> <br/>
        8. Providing financing, M&A solutions and assisting in their implementation.
        <br/> <br/>
        9. Assisting in introducing external investors and implementing corporate restructuring.
        `
      },
      {
        title: '税务',
        text: '我们提供的法律服务<br/><br/>1.税法咨询业务，包括涉及居民企业的境内外并购、重组税法问题，与跨境交易有关的中国税法及税收协定问题，居民企业从事境外交易的相关税法问题，有关企业日常经营的税法问题，包括企业所得税、增值税、营业税和其他税收问题，以及个人所得税，员工持股计划和股票期权的税务问题；<br/><br/>2.涉税合同条款起草、审查、谈判等；<br/><br/>3.税务争议解决，包括税企关系协调沟通，税务稽查应对策划，纳税人权益法律救济等；<br/><br/>4.其他税法服务，包括税务尽职调查，间接转让中国应税财产申报，其它税务咨询等；<br/><br/>5. 海关咨询业务，包括产品进出口相关的海关法律法规，保税加工、保税物流等相关的海关法规和进口环节增值税、消费税，以及海关缉私调查应对策划和相关海关法律法规的咨询。',
        text2: `
        Legal services we provide
        <br/> <br/>
        1. Tax law advisory services, including domestic and foreign M&A and restructuring tax issues involving resident enterprises, China tax law and tax treaty issues related to cross-border transactions, tax law issues related to resident enterprises engaging in overseas transactions, tax law issues related to daily operations of enterprises, including corporate income tax, VAT, business tax and other tax issues, as well as personal income tax, tax issues of employee stock ownership plans and stock options ; and
        <br/> <br/>
        2. Tax-related contract provisions drafting, review, negotiation, etc.
        <br/> <br/>
        3. Tax dispute resolution, including tax-enterprise relationship coordination and communication, tax audit response planning, legal remedies for taxpayers' rights and interests, etc.
        <br/> <br/>
        4. Other tax law services, including tax due diligence, declaration of taxable property in China for indirect transfer, other tax consultation, etc.
        <br/> <br/>
        5. Customs consulting services, including customs laws and regulations related to product import and export, customs regulations related to bonded processing, bonded logistics, etc. and VAT and consumption tax on import links, as well as customs investigation response planning and consulting on related customs laws and regulations.
        `
      }
    ]
  },
  methods: {
    open(index) {
      let lang = localStorage.getItem('language')
      this.textData.title = this.textList[index - 1].title
      this.textData.text = lang == 'en' ? this.textList[index - 1].text2 : this.textList[index - 1].text
      this.index = index
      this.show = true
    },
    close() {
      this.show = false
    },
    navOpenRight() {
      this.isRight = true
    },
    navCloseRight() {
      this.isRight = false
    }
  }
})