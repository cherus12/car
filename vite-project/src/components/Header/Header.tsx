import * as React from 'react'
import { styled, alpha } from '@mui/material/styles'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import InputBase from '@mui/material/InputBase'
import Badge from '@mui/material/Badge'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AccountCircle from '@mui/icons-material/AccountCircle'
import MailIcon from '@mui/icons-material/Mail'
import NotificationsIcon from '@mui/icons-material/Notifications'
import MoreIcon from '@mui/icons-material/MoreVert'
import { ArrowBack } from '@mui/icons-material'

import './header.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useAuth0 } from '@auth0/auth0-react'

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	marginRight: theme.spacing(2),
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '20ch',
		},
	},
}))

export default function Header() {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
		React.useState<null | HTMLElement>(null)

	const isMenuOpen = Boolean(anchorEl)
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

	const user = JSON.parse(localStorage.getItem('user'))
	// const user = localStorage.getItem('user')

	// console.log(user, 'user-HEADER')

	// const token = localStorage.getItem('token')

	const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget)
	}

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null)
	}

	const handleMenuClose = () => {
		setAnchorEl(null)
		handleMobileMenuClose()
	}

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget)
	}

	const handleLogout = () => {
		localStorage.removeItem('token')
	}

	const menuId = 'primary-search-account-menu'
	const renderMenu = (
		<Menu
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={menuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMenuOpen}
			onClose={handleMenuClose}
			sx={{ top: '40px', left: '-10px' }}
		>
			<div className='header-modal-user'>
				<img
					src='	https://avatars.mds.yandex.net/get-autoru-users/42279/a111c03e8a18d7de011460227b887428/48x48'
					alt=''
				/>
				<div className='header-modal-user-info'>
					<div className='header-modal-user-name'>{user?.username}</div>
					<div className='header-modal-user-id'>{user?.id}</div>
				</div>
			</div>
			<Link to={'/my'}>
				<div className='header-modal-item'>
					<MenuItem onClick={handleMenuClose} className='header-menu-item'>
						<div>Мои объявления</div>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							class='IconSvg IconSvg_name_SvgMyOffers IconSvg_size_24 HeaderUserMenu__linkIcon'
						>
							<path
								fill='currentColor'
								fill-rule='evenodd'
								d='M19 4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-2.67h4.52l.11 1.5c.03.38.36.67.75.67h1.18c.41 0 .75-.32.75-.72V13.6a6.6 6.6 0 0 0-.5-2.43l-.25-.61-.57-1.35-.04-.1-.5-1.64-.33-1.04-.06-.2a14.7 14.7 0 0 0-5-.73H4V5a1 1 0 0 1 1-1zM2 19V5a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v14a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3M7.71 8.56l-.15-.53-.04-.01a7 7 0 0 0-1.45-.29h-.03c-.6-.06-1.23-.06-1.92-.06h-.05l-.01-.11v.1a80 80 0 0 1 0 2.9H8.3l-.2-.68-.06-.18-.34-1.14zm-3.7 4v1.77h5.3v-.72c0-.34-.05-.7-.14-1.05zM14 6a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2z'
								clip-rule='evenodd'
							></path>
						</svg>
					</MenuItem>
				</div>
			</Link>
			<Link to={'/favourites'}>
				<div className='header-modal-item'>
					<MenuItem onClick={handleMenuClose} className='header-menu-item'>
						<div>Избранное</div>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							class='IconSvg IconSvg_name_SvgFavorite IconSvg_size_24 HeaderUserMenu__linkIcon'
						>
							<path
								fill='currentColor'
								d='M7.79 3c-1.47 0-2.935.593-4.066 1.76-2.299 2.372-2.299 6.326 0 8.7L12 22l8.276-8.54a6.15 6.15 0 0 0 0-8.542c-1.15-1.186-2.644-1.78-4.138-1.78S13.15 3.732 12 4.918C10.832 3.633 9.308 3 7.79 3m0 2.012c1.023 0 1.994.448 2.734 1.263l1.429 1.574 1.479-1.527c.733-.755 1.694-1.171 2.706-1.171s1.974.416 2.706 1.171c1.53 1.58 1.53 4.153 0 5.733L12 19.117l-6.843-7.062c-1.547-1.596-1.547-4.294 0-5.89.72-.744 1.655-1.153 2.633-1.153'
							></path>
						</svg>
					</MenuItem>
				</div>
			</Link>
			<Link to={'/saved-search'}>
				<div className='header-modal-item'>
					<MenuItem onClick={handleMenuClose} className='header-menu-item'>
						<div>Сохранённые поиски</div>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							class='IconSvg IconSvg_name_SvgSubscription IconSvg_size_24 HeaderUserMenu__linkIcon'
						>
							<path
								fill='currentColor'
								d='M18.823 2.293c-1.204 0-2.418.63-2.817 1.892-.4-1.261-1.614-1.892-2.817-1.892-.803 0-1.601.28-2.149.842a3.65 3.65 0 0 0 0 5.079l4.966 5.079 4.966-5.08a3.65 3.65 0 0 0 0-5.078c-.549-.561-1.346-.842-2.149-.842m-5.634 2c1.023 0 2.576 1.565 2.817 2.088.241-.523 1.771-2.088 2.817-2.088.299 0 .767.33.912.479.654.603.422 1.414-.193 2.044l-3.536 3.616-3.536-3.616c-.616-.63-.846-1.452-.152-2.1.145-.147.572-.423.871-.423m.412 10.186 7.107 7.107L19.293 23l-7.106-7.107A6.96 6.96 0 0 1 8 17.293a7 7 0 1 1 0-14v2c-2.757 0-5 2.243-5 5s2.243 5 5 5a5.01 5.01 0 0 0 4.167-2.248z'
							></path>
						</svg>
					</MenuItem>
				</div>
			</Link>
			<Link to={'/messages'}>
				<div className='header-modal-item'>
					<MenuItem onClick={handleMenuClose} className='header-menu-item'>
						<div>Сообщения</div>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 24 24'
							class='IconSvg IconSvg_name_SvgChat IconSvg_size_24 HeaderUserMenu__linkIcon'
						>
							<path
								fill='currentColor'
								d='M12.506 1C6.711 1 2.013 5.694 2.013 11.485c0 1.909.519 3.693 1.41 5.235L2 22l5.943-1.084a10.45 10.45 0 0 0 4.563 1.054C18.302 21.97 23 17.276 23 11.485S18.302 1 12.506 1m0 2c4.685 0 8.495 3.806 8.495 8.485s-3.81 8.485-8.495 8.485a8.4 8.4 0 0 1-3.692-.855l-.587-.284-.641.117-2.833.517.6-2.225.217-.803-.417-.719a8.47 8.47 0 0 1-1.141-4.233C4.012 6.806 7.822 3 12.506 3M9 11.5a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9 11.5m5 0a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 14 11.5m5 0a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 19 11.5'
							></path>
						</svg>
					</MenuItem>
				</div>
			</Link>
			<Link to={'/compare'}>
				<div className='header-modal-item'>
					<MenuItem onClick={handleMenuClose} className='header-menu-item'>
						<div>Сравнения</div>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							class='IconSvg IconSvg_name_SvgCarCompare IconSvg_size_24 HeaderUserMenu__linkIcon'
						>
							<path
								fill='currentColor'
								fill-rule='evenodd'
								d='M11 24V0h2v24zM2.29 11l-.58 1.18A6.33 6.33 0 0 0 1 15.3V21a1 1 0 0 0 1 1h1.57a1 1 0 0 0 1-.93L4.7 19H9v-2H3v-1.68c0-.87.1-1.54.47-2.2l.01-.02.05-.1H9v-2H4.16L5.9 6.67A15 15 0 0 1 9 6.11v-2c-1.77.14-3.23.45-4.61.98L2.8 9H1a1 1 0 0 0-1 1v1zm19.42 0 .58 1.18c.58 1.06.7 2.11.71 3.13V21a1 1 0 0 1-1 1h-1.57a1 1 0 0 1-1-.93L19.3 19H15v-2h6v-1.68c0-.87-.1-1.54-.47-2.2l-.01-.02-.05-.1H15v-2h4.84L18.1 6.67a15 15 0 0 0-3.1-.56v-2c1.77.14 3.23.45 4.61.98L21.2 9H23a1 1 0 0 1 1 1v1z'
								clip-rule='evenodd'
							></path>
						</svg>
					</MenuItem>
				</div>
			</Link>
			<Link to={'/history'}>
				<div className='header-modal-item'>
					<MenuItem onClick={handleMenuClose} className='header-menu-item'>
						<div>Отсчёты</div>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							class='IconSvg IconSvg_name_SvgReport IconSvg_size_24 HeaderUserMenu__linkIcon'
						>
							<path
								fill='currentColor'
								d='M4 5a1 1 0 0 1 1-1h11.781V2H5a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8.266h-2V19a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1z'
							></path>
							<path
								fill='currentColor'
								d='m21.277 3.31-9.78 10.245L7.72 9.632l-1.44 1.386 4.5 4.676 1.443-.004 10.5-11z'
							></path>
						</svg>
					</MenuItem>
				</div>
			</Link>
			<Link to={'/profile'}>
				<div className='header-modal-item'>
					<MenuItem onClick={handleMenuClose} className='header-menu-item'>
						<div>Профиль</div>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 29 29'
							class='IconSvg IconSvg_name_SvgProfile IconSvg_size_24 HeaderUserMenu__linkIcon'
						>
							<path
								fill='currentColor'
								d='M13.8 0C6.4.4.3 6.5 0 14c-.2 4.6 1.8 8.7 5 11.4 1.2 1.1 2.7 2 4.2 2.6 1.6.6 3.4 1 5.2 1 2 0 3.7-.3 5.3-.8q2.4-.75 4.2-2.1c3.2-2.5 5-6.5 5-11.6C29 6.3 22.1-.4 13.8 0m.7 27c-2.8 0-5.3-.9-7.4-2.4.1-.5.4-1 .9-1.3.3-.2.7-.3 1.1-.3h1.4l1.5-1.7 1.1-1.5c.5.2.9.3 1.4.3q.75 0 1.5-.3l1.1 1.5 1.5 1.7H20c.4 0 .6.2 1 .4.6.3 1 1 1.1 1.7-2 1.2-4.6 1.9-7.6 1.9m3.7-15c.5 0 .8.6.8 1v.4c0 .4-.2.6-.8.6H18v.6c0 1.9-1.8 3.5-3.4 3.5-1.7 0-3.6-1.7-3.6-3.6V14h-.2c-.5 0-.7-.2-.7-.6V13c0-.4.2-1 .8-1h.1V9c0-1.5 1.9-2 3-2h1c1.1 0 3 .7 3 2.1V12zm5.6 11.7c-.6-1.5-2.2-2.6-3.9-2.6h-.4l-1.7-2.3c1.2-.9 2.1-2.3 2.3-3.7.8-.5 1-.7 1-1.7V13c0-.9-.3-1.5-1-2V8.1L20 8c-.1-.3-.3-.5-.5-.7C18.5 5.9 16.7 5 15 5h-1c-1.6 0-3.1.7-4.2 2-.2.3-.6.8-.7 1.1v.1L9 11c-.8.5-1 1.1-1 2v.4c0 .9.2 1.2 1 1.7.2 1.4 1.1 2.8 2.3 3.7l-1.7 2.3h-.4c-1.6 0-2.9.9-3.7 2.1-2.6-2.6-4-6.4-3.5-10.4.8-5.6 5.4-10.1 11.1-10.7 7.5-.9 13.9 5 13.9 12.4 0 4-1.1 7.1-3.2 9.2'
							></path>
						</svg>
					</MenuItem>
				</div>
			</Link>
			<Link to={`/login`} onClick={handleLogout}>
				<div className='header-modal-item'>
					<MenuItem onClick={handleMenuClose} className='header-menu-item'>
						<div>Выйти</div>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							class='IconSvg IconSvg_name_SvgLogout IconSvg_size_24 HeaderUserMenu__linkIcon'
						>
							<path
								fill='currentColor'
								fill-rule='evenodd'
								d='M20.662 13H12a1 1 0 1 1 0-2h8.662l-1.38-1.367a.95.95 0 0 1 0-1.353.97.97 0 0 1 1.365 0l3.07 3.044a.95.95 0 0 1 0 1.352l-3.07 3.044a.97.97 0 0 1-1.364 0 .95.95 0 0 1 0-1.353zM15 16a1 1 0 1 1 2 0v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 1 1-2 0V5H5v14h10z'
								clip-rule='evenodd'
							></path>
						</svg>
					</MenuItem>
				</div>
			</Link>
		</Menu>
	)

	const mobileMenuId = 'primary-search-account-menu-mobile'
	const renderMobileMenu = (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MenuItem>
				<IconButton size='large' aria-label='show 4 new mails' color='inherit'>
					<Badge badgeContent={4} color='error'>
						<MailIcon />
					</Badge>
				</IconButton>
				<p>Messages</p>
			</MenuItem>
			<MenuItem>
				<IconButton
					size='large'
					aria-label='show 17 new notifications'
					color='inherit'
				>
					<Badge badgeContent={17} color='error'>
						<NotificationsIcon />
					</Badge>
				</IconButton>
				<p>Notifications</p>
			</MenuItem>
			<MenuItem onClick={handleProfileMenuOpen} style={{ minWidth: '280px' }}>
				<IconButton
					size='large'
					aria-label='account of current user'
					aria-controls='primary-search-account-menu'
					aria-haspopup='true'
					color='inherit'
				>
					<AccountCircle />
				</IconButton>
				<p>Profile</p>
			</MenuItem>
		</Menu>
	)

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position='static'>
				<Toolbar sx={{ width: '80%', margin: '0 auto' }}>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='open drawer'
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{ display: { xs: 'none', sm: 'block' } }}
					>
						<a href='/'>CAR.COM</a>
					</Typography>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search…'
							inputProps={{ 'aria-label': 'search' }}
						/>
					</Search>
					<Box sx={{ flexGrow: 1 }} />
					<Box
						sx={{ display: { xs: 'none', md: 'flex', alignItems: 'center' } }}
					>
						<div className='header-link-item'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								class='IconSvg IconSvg_name_SvgFavorite IconSvg_size_24 HeaderMyLink__icon'
							>
								<path
									fill='currentColor'
									d='M7.79 3c-1.47 0-2.935.593-4.066 1.76-2.299 2.372-2.299 6.326 0 8.7L12 22l8.276-8.54a6.15 6.15 0 0 0 0-8.542c-1.15-1.186-2.644-1.78-4.138-1.78S13.15 3.732 12 4.918C10.832 3.633 9.308 3 7.79 3m0 2.012c1.023 0 1.994.448 2.734 1.263l1.429 1.574 1.479-1.527c.733-.755 1.694-1.171 2.706-1.171s1.974.416 2.706 1.171c1.53 1.58 1.53 4.153 0 5.733L12 19.117l-6.843-7.062c-1.547-1.596-1.547-4.294 0-5.89.72-.744 1.655-1.153 2.633-1.153'
								></path>
							</svg>
							<div>Избранное</div>
						</div>
						<div className='header-link-item'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								className='IconSvg IconSvg_name_SvgSubscription IconSvg_size_24 HeaderMyLink__icon'
							>
								<path
									fill='currentColor'
									d='M18.823 2.293c-1.204 0-2.418.63-2.817 1.892-.4-1.261-1.614-1.892-2.817-1.892-.803 0-1.601.28-2.149.842a3.65 3.65 0 0 0 0 5.079l4.966 5.079 4.966-5.08a3.65 3.65 0 0 0 0-5.078c-.549-.561-1.346-.842-2.149-.842m-5.634 2c1.023 0 2.576 1.565 2.817 2.088.241-.523 1.771-2.088 2.817-2.088.299 0 .767.33.912.479.654.603.422 1.414-.193 2.044l-3.536 3.616-3.536-3.616c-.616-.63-.846-1.452-.152-2.1.145-.147.572-.423.871-.423m.412 10.186 7.107 7.107L19.293 23l-7.106-7.107A6.96 6.96 0 0 1 8 17.293a7 7 0 1 1 0-14v2c-2.757 0-5 2.243-5 5s2.243 5 5 5a5.01 5.01 0 0 0 4.167-2.248z'
								></path>
							</svg>
							<div>Поиски</div>
						</div>
						<div className='header-link-item'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'
								className='header-icon'
							>
								<path
									fill='currentColor'
									d='M12.506 1C6.711 1 2.013 5.694 2.013 11.485c0 1.909.519 3.693 1.41 5.235L2 22l5.943-1.084a10.45 10.45 0 0 0 4.563 1.054C18.302 21.97 23 17.276 23 11.485S18.302 1 12.506 1m0 2c4.685 0 8.495 3.806 8.495 8.485s-3.81 8.485-8.495 8.485a8.4 8.4 0 0 1-3.692-.855l-.587-.284-.641.117-2.833.517.6-2.225.217-.803-.417-.719a8.47 8.47 0 0 1-1.141-4.233C4.012 6.806 7.822 3 12.506 3M9 11.5a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 9 11.5m5 0a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 14 11.5m5 0a1.5 1.5 0 1 0-3.001.001A1.5 1.5 0 0 0 19 11.5'
								></path>
							</svg>
							<div>Сообщения</div>
						</div>
						{user ? (
							<IconButton
								size='large'
								edge='end'
								aria-label='account of current user'
								aria-controls={menuId}
								aria-haspopup='true'
								onClick={handleProfileMenuOpen}
								color='inherit'
							>
								<AccountCircle />
							</IconButton>
						) : (
							<a href='/login' className='header__auth-button'>
								Войти
							</a>
						)}
						<div className='header-button-ad'>
							<a href='/car/ad'>Разместить объявления</a>
						</div>
					</Box>
					<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='show more'
							aria-controls={mobileMenuId}
							aria-haspopup='true'
							onClick={handleMobileMenuOpen}
							color='inherit'
						>
							<MoreIcon />
						</IconButton>
					</Box>
				</Toolbar>
			</AppBar>
			{renderMobileMenu}
			{renderMenu}
		</Box>
	)
}
