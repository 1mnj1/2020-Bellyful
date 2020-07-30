/****** Object:  Database [Bellyful_DB]    Script Date: 7/9/2020 2:22:47 PM ******/
CREATE DATABASE [Bellyful_DB]  (EDITION = 'Standard', SERVICE_OBJECTIVE = 'S0', MAXSIZE = 250 GB) WITH CATALOG_COLLATION = SQL_Latin1_General_CP1_CI_AS;
GO
ALTER DATABASE [Bellyful_DB] SET COMPATIBILITY_LEVEL = 150
GO
ALTER DATABASE [Bellyful_DB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [Bellyful_DB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [Bellyful_DB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [Bellyful_DB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [Bellyful_DB] SET ARITHABORT OFF 
GO
ALTER DATABASE [Bellyful_DB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [Bellyful_DB] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [Bellyful_DB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [Bellyful_DB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [Bellyful_DB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [Bellyful_DB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [Bellyful_DB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [Bellyful_DB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [Bellyful_DB] SET ALLOW_SNAPSHOT_ISOLATION ON 
GO
ALTER DATABASE [Bellyful_DB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [Bellyful_DB] SET READ_COMMITTED_SNAPSHOT ON 
GO
ALTER DATABASE [Bellyful_DB] SET  MULTI_USER 
GO
ALTER DATABASE [Bellyful_DB] SET ENCRYPTION ON
GO
ALTER DATABASE [Bellyful_DB] SET QUERY_STORE = ON
GO
ALTER DATABASE [Bellyful_DB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 100, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
/****** Object:  Table [dbo].[BRANCH_INFO]    Script Date: 7/9/2020 2:22:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[BRANCH_INFO](
	[branchid] [int] IDENTITY(1,1) NOT NULL,
	[branch_name] [varchar](100) NULL,
	[address1] [varchar](100) NULL,
	[address2] [varchar](100) NULL,
	[city] [varchar](100) NULL,
 CONSTRAINT [PK_BRANCH_INFO] PRIMARY KEY CLUSTERED 
(
	[branchid] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[DELIVERY_DETAILS]    Script Date: 7/9/2020 2:22:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[DELIVERY_DETAILS](
	[delivery_id] [int] IDENTITY(1,1) NOT NULL,
	[refferal_id] [int] NOT NULL,
	[recipient_id] [int] NOT NULL,
	[status] [varchar](50) NULL,
	[start_time] [datetime] NULL,
	[finish_time] [datetime] NULL,
	[user_id] [int] NULL,
 CONSTRAINT [PK_DELIVERY_DETAILS] PRIMARY KEY CLUSTERED 
(
	[delivery_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FREEZER_STOCK]    Script Date: 7/9/2020 2:22:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FREEZER_STOCK](
	[stockid] [int] IDENTITY(1,1) NOT NULL,
	[stock_name] [varchar](100) NULL,
	[stock_amount] [varchar](100) NULL,
	[fid] [int] NULL,
 CONSTRAINT [PK_FREEZER_STOCK] PRIMARY KEY CLUSTERED 
(
	[stockid] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FREEZERS]    Script Date: 7/9/2020 2:22:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FREEZERS](
	[fid] [int] IDENTITY(1,1) NOT NULL,
	[freezer_name] [varchar](100) NULL,
	[branch_id] [int] NULL,
	[available] [bit] NULL,
	[freezer_keeper_id] [int] NULL,
 CONSTRAINT [PK_FREEZERS] PRIMARY KEY CLUSTERED 
(
	[fid] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[RECIPIENTS]    Script Date: 7/9/2020 2:22:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[RECIPIENTS](
	[recipientid] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NULL,
	[address] [varchar](100) NULL,
	[email] [varchar](100) NULL,
	[phone] [varchar](100) NULL,
	[dog_on_property] [bit] NULL,
	[children_under_5] [bit] NULL,
	[children_5_to_10] [bit] NULL,
	[children_10_to_17] [bit] NULL,
	[dietary_requirements] [varchar](100) NULL,
	[alergies] [varchar](100) NULL,
 CONSTRAINT [PK_RECIPIENTS] PRIMARY KEY CLUSTERED 
(
	[recipientid] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[REFERRALS]    Script Date: 7/9/2020 2:22:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[REFERRALS](
	[refferer_id] [int] IDENTITY(1,1) NOT NULL,
	[name] [varchar](100) NULL,
	[address] [varchar](100) NULL,
	[phone_number] [varchar](100) NULL,
	[email] [varchar](100) NULL,
 CONSTRAINT [PK_REFERRALS] PRIMARY KEY CLUSTERED 
(
	[refferer_id] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[TEST_DELIVERIES]    Script Date: 7/9/2020 2:22:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[TEST_DELIVERIES](
	[name] [varchar](100) NULL,
	[address] [varchar](100) NULL,
	[phone] [varchar](100) NULL,
	[food] [varchar](100) NULL,
	[status] [varchar](50) NULL,
	[uid] [nchar](10) NULL,
	[timestamp] [nchar](10) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USER_CONTACT]    Script Date: 7/9/2020 2:22:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USER_CONTACT](
	[uid] [int] NOT NULL,
	[first_name] [nvarchar](50) NOT NULL,
	[last_name] [nvarchar](50) NOT NULL,
	[address1] [nvarchar](50) NOT NULL,
	[address2] [nvarchar](50) NOT NULL,
	[city] [nvarchar](50) NOT NULL,
	[email] [nvarchar](50) NOT NULL,
	[phone_number] [nvarchar](50) NOT NULL,
	[emergency_phone] [nvarchar](50) NOT NULL,
	[contact_type] [nvarchar](50) NULL
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[USER_LOGIN]    Script Date: 7/9/2020 2:22:48 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[USER_LOGIN](
	[uid] [int] IDENTITY(1,1) NOT NULL,
	[username] [nchar](10) NULL,
	[password] [nchar](10) NULL,
	[contactid] [nchar](10) NULL,
	[sessionid] [nchar](10) NULL,
 CONSTRAINT [PK_USER_LOGIN] PRIMARY KEY CLUSTERED 
(
	[uid] ASC
)WITH (STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[BRANCH_INFO] ON 

INSERT [dbo].[BRANCH_INFO] ([branchid], [branch_name], [address1], [address2], [city]) VALUES (1, N'North Shore Branch', N'298 Yates Street', N'North Shore', N'Auckland')
INSERT [dbo].[BRANCH_INFO] ([branchid], [branch_name], [address1], [address2], [city]) VALUES (2, N'Wellington Branch', N'343 Peters Road', N'Churton Park', N'Wellington')
SET IDENTITY_INSERT [dbo].[BRANCH_INFO] OFF
GO
SET IDENTITY_INSERT [dbo].[DELIVERY_DETAILS] ON 

INSERT [dbo].[DELIVERY_DETAILS] ([delivery_id], [refferal_id], [recipient_id], [status], [start_time], [finish_time], [user_id]) VALUES (1, 1, 12, N'New', NULL, NULL, NULL)
INSERT [dbo].[DELIVERY_DETAILS] ([delivery_id], [refferal_id], [recipient_id], [status], [start_time], [finish_time], [user_id]) VALUES (2, 1, 5, N'outstanding', NULL, NULL, 1)
INSERT [dbo].[DELIVERY_DETAILS] ([delivery_id], [refferal_id], [recipient_id], [status], [start_time], [finish_time], [user_id]) VALUES (3, 2, 48, N'confirmed', NULL, NULL, 1)
INSERT [dbo].[DELIVERY_DETAILS] ([delivery_id], [refferal_id], [recipient_id], [status], [start_time], [finish_time], [user_id]) VALUES (6, 2, 13, N'completed', CAST(N'2019-04-01T12:19:00.000' AS DateTime), CAST(N'2019-04-01T13:48:00.000' AS DateTime), 1)
INSERT [dbo].[DELIVERY_DETAILS] ([delivery_id], [refferal_id], [recipient_id], [status], [start_time], [finish_time], [user_id]) VALUES (7, 2, 13, N'in progress', CAST(N'2019-03-21T09:30:00.000' AS DateTime), NULL, 1)
SET IDENTITY_INSERT [dbo].[DELIVERY_DETAILS] OFF
GO
SET IDENTITY_INSERT [dbo].[FREEZER_STOCK] ON 

INSERT [dbo].[FREEZER_STOCK] ([stockid], [stock_name], [stock_amount], [fid]) VALUES (1, N'Lasagne', N'13', 1)
INSERT [dbo].[FREEZER_STOCK] ([stockid], [stock_name], [stock_amount], [fid]) VALUES (2, N'Macaroni and Cheese', N'26', 1)
INSERT [dbo].[FREEZER_STOCK] ([stockid], [stock_name], [stock_amount], [fid]) VALUES (3, N'Bolognese', N'14', 1)
INSERT [dbo].[FREEZER_STOCK] ([stockid], [stock_name], [stock_amount], [fid]) VALUES (4, N'Lasagne', N'31', 2)
INSERT [dbo].[FREEZER_STOCK] ([stockid], [stock_name], [stock_amount], [fid]) VALUES (5, N'Macaroni and Cheese', N'12', 2)
INSERT [dbo].[FREEZER_STOCK] ([stockid], [stock_name], [stock_amount], [fid]) VALUES (6, N'Bolognese', N'19', 2)
SET IDENTITY_INSERT [dbo].[FREEZER_STOCK] OFF
GO
SET IDENTITY_INSERT [dbo].[FREEZERS] ON 

INSERT [dbo].[FREEZERS] ([fid], [freezer_name], [branch_id], [available], [freezer_keeper_id]) VALUES (4, N'Sarahs Freezer', 1, 1, 5)
INSERT [dbo].[FREEZERS] ([fid], [freezer_name], [branch_id], [available], [freezer_keeper_id]) VALUES (5, N'Kevins Freezer', 1, 1, 6)
INSERT [dbo].[FREEZERS] ([fid], [freezer_name], [branch_id], [available], [freezer_keeper_id]) VALUES (6, N'Richards Freezer', 2, 0, 12)
SET IDENTITY_INSERT [dbo].[FREEZERS] OFF
GO
SET IDENTITY_INSERT [dbo].[RECIPIENTS] ON 

INSERT [dbo].[RECIPIENTS] ([recipientid], [name], [address], [email], [phone], [dog_on_property], [children_under_5], [children_5_to_10], [children_10_to_17], [dietary_requirements], [alergies]) VALUES (1, N'Mary Wells', N'12A Cherry Street', N'mwells@outlook.com', N'022 615 8413', 1, 0, 0, 0, N'None', N'None')
SET IDENTITY_INSERT [dbo].[RECIPIENTS] OFF
GO
SET IDENTITY_INSERT [dbo].[REFERRALS] ON 

INSERT [dbo].[REFERRALS] ([refferer_id], [name], [address], [phone_number], [email]) VALUES (1, N'James Hilton', N'156 Ford Lane', N'874 8461', N'jhilton@gmail.com')
SET IDENTITY_INSERT [dbo].[REFERRALS] OFF
GO
INSERT [dbo].[TEST_DELIVERIES] ([name], [address], [phone], [food], [status], [uid], [timestamp]) VALUES (N'David Smith', N'123 Henderson Street', N'020 318 443', N'Las x1 M&C x2 Bol x1', N'New', NULL, NULL)
INSERT [dbo].[TEST_DELIVERIES] ([name], [address], [phone], [food], [status], [uid], [timestamp]) VALUES (N'John Adams', N'651 Swanson Street', N'021 314 5165', N'Las x2 M&C x3 Bol x1', N'New', NULL, NULL)
INSERT [dbo].[TEST_DELIVERIES] ([name], [address], [phone], [food], [status], [uid], [timestamp]) VALUES (N'Richard Clark', N'184 Albany Street', N'022 561 7491', N'Las x4 M&C x2 Bol x2', N'New', NULL, NULL)
INSERT [dbo].[TEST_DELIVERIES] ([name], [address], [phone], [food], [status], [uid], [timestamp]) VALUES (N'James Blake', N'161 Northern Road', N'021 913 5149', N'Las x1 M&C x3 Bol x2', N'New', NULL, NULL)
INSERT [dbo].[TEST_DELIVERIES] ([name], [address], [phone], [food], [status], [uid], [timestamp]) VALUES (N'Henry Harper', N'561 Auckland Drive', N'021 978 1328', N'Las x3 M&C x3 Bol x2', N'New', NULL, NULL)
INSERT [dbo].[TEST_DELIVERIES] ([name], [address], [phone], [food], [status], [uid], [timestamp]) VALUES (N'Ben Davis', N'165 Rural Road', N'022 651 6465', N'Las x0 M&C x3 Bol x0', N'confirmed', NULL, NULL)
INSERT [dbo].[TEST_DELIVERIES] ([name], [address], [phone], [food], [status], [uid], [timestamp]) VALUES (N'Christopher Summers', N'184 Eden Terrace', N'021 984 6511', N'Las x3 M&C x1 Bol x2', N'confirmed', NULL, NULL)
INSERT [dbo].[TEST_DELIVERIES] ([name], [address], [phone], [food], [status], [uid], [timestamp]) VALUES (N'Terry Yates', N'16/A York Street ', N'022 561 3738', N'Las x1 M&C x2 Bol x0', N'confirmed', NULL, NULL)
INSERT [dbo].[TEST_DELIVERIES] ([name], [address], [phone], [food], [status], [uid], [timestamp]) VALUES (N'Blake Ford', N'18 Clifford Avenue', N'020 561 8465', N'Las x3 M&C x0 Bol x2', N'outstanding', NULL, NULL)
INSERT [dbo].[TEST_DELIVERIES] ([name], [address], [phone], [food], [status], [uid], [timestamp]) VALUES (N'Nate Sheppard', N'13 Simon Street', N'021 913 7349', N'Las x4 M&C x3 Bol x0', N'outstanding', NULL, NULL)
INSERT [dbo].[TEST_DELIVERIES] ([name], [address], [phone], [food], [status], [uid], [timestamp]) VALUES (N'Bill Peters', N'51 Minnow Place', N'022 913 7584', N'Las x5 M&C x0 Bol x2', N'branch', NULL, NULL)
GO
INSERT [dbo].[USER_CONTACT] ([uid], [first_name], [last_name], [address1], [address2], [city], [email], [phone_number], [emergency_phone], [contact_type]) VALUES (1, N'Oscar', N'Scott', N'267 Rodney Avenue', N'Henderson', N'Auckland', N'oscar@bellyful.com', N'872 8233', N'022 561 6515', N'Volunteer')
GO
SET IDENTITY_INSERT [dbo].[USER_LOGIN] ON 

INSERT [dbo].[USER_LOGIN] ([uid], [username], [password], [contactid], [sessionid]) VALUES (1, N'Oscar     ', N'password  ', NULL, NULL)
INSERT [dbo].[USER_LOGIN] ([uid], [username], [password], [contactid], [sessionid]) VALUES (2, N'Andrew    ', N'password  ', NULL, NULL)
INSERT [dbo].[USER_LOGIN] ([uid], [username], [password], [contactid], [sessionid]) VALUES (3, N'Sam       ', N'password  ', NULL, NULL)
INSERT [dbo].[USER_LOGIN] ([uid], [username], [password], [contactid], [sessionid]) VALUES (4, N'Matt      ', N'password  ', NULL, NULL)
SET IDENTITY_INSERT [dbo].[USER_LOGIN] OFF
GO
ALTER DATABASE [Bellyful_DB] SET  READ_WRITE 
GO
