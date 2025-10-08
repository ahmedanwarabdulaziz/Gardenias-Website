'use client';

import { Box, Container, Typography } from '@mui/material';

interface StaffMember {
  id: string;
  name: string;
  picture?: string;
}

interface ServiceBookingNotesProps {
  preBookingNote?: string;
  postBookingInstructions?: string;
  practitioners?: StaffMember[];
}

export default function ServiceBookingNotes({
  preBookingNote,
  postBookingInstructions,
  practitioners = [],
}: ServiceBookingNotesProps) {
  // Don't render if both notes are empty
  if (!preBookingNote && !postBookingInstructions) {
    return null;
  }

  return (
    <Box
      sx={{
        py: 8,
        backgroundColor: '#f8f9fa',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 4, md: 6 } }}>
          {/* Left Column - Staff Images Collage */}
          <Box sx={{ flex: { xs: '1', md: '0 0 45%' }, position: 'relative', minHeight: { xs: '400px', md: '500px' } }}>
            {practitioners.length > 0 ? (
              <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                {/* First (Main) Staff Image - Large Background */}
                {practitioners[0]?.picture && (
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '300px',
                      height: '360px',
                      left: '50%',
                      top: '50%',
                      transform: 'translate(-50%, -50%)',
                      borderRadius: 3,
                      overflow: 'hidden',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
                      border: '4px solid white',
                      zIndex: 1,
                    }}
                  >
                    <Box
                      component="img"
                      src={practitioners[0].picture}
                      alt={practitioners[0].name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}

                {/* Second Staff Image - Top Left Large */}
                {practitioners[1]?.picture && (
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '160px',
                      height: '180px',
                      left: '5%',
                      top: '3%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
                      border: '3px solid white',
                      transform: 'rotate(-12deg)',
                      zIndex: 5,
                    }}
                  >
                    <Box
                      component="img"
                      src={practitioners[1].picture}
                      alt={practitioners[1].name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}

                {/* Third Staff Image - Top Center */}
                {practitioners[2]?.picture && (
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100px',
                      height: '120px',
                      left: '40%',
                      top: '0%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 10px 24px rgba(0,0,0,0.13)',
                      border: '3px solid white',
                      transform: 'rotate(8deg)',
                      zIndex: 6,
                    }}
                  >
                    <Box
                      component="img"
                      src={practitioners[2].picture}
                      alt={practitioners[2].name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}

                {/* Fourth Staff Image - Top Right Medium */}
                {practitioners[3]?.picture && (
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '140px',
                      height: '160px',
                      right: '5%',
                      top: '8%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
                      border: '3px solid white',
                      transform: 'rotate(15deg)',
                      zIndex: 4,
                    }}
                  >
                    <Box
                      component="img"
                      src={practitioners[3].picture}
                      alt={practitioners[3].name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}

                {/* Fifth Staff Image - Middle Left Small */}
                {practitioners[4]?.picture && (
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '90px',
                      height: '110px',
                      left: '2%',
                      top: '45%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 10px 24px rgba(0,0,0,0.13)',
                      border: '3px solid white',
                      transform: 'rotate(-18deg)',
                      zIndex: 3,
                    }}
                  >
                    <Box
                      component="img"
                      src={practitioners[4].picture}
                      alt={practitioners[4].name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}

                {/* Sixth Staff Image - Middle Right Small */}
                {practitioners[5]?.picture && (
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '110px',
                      height: '130px',
                      right: '0%',
                      top: '52%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 10px 24px rgba(0,0,0,0.13)',
                      border: '3px solid white',
                      transform: 'rotate(10deg)',
                      zIndex: 3,
                    }}
                  >
                    <Box
                      component="img"
                      src={practitioners[5].picture}
                      alt={practitioners[5].name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}

                {/* Seventh Staff Image - Bottom Left Medium */}
                {practitioners[6]?.picture && (
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '130px',
                      height: '150px',
                      left: '8%',
                      bottom: '5%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
                      border: '3px solid white',
                      transform: 'rotate(6deg)',
                      zIndex: 4,
                    }}
                  >
                    <Box
                      component="img"
                      src={practitioners[6].picture}
                      alt={practitioners[6].name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}

                {/* Eighth Staff Image - Bottom Center Small */}
                {practitioners[7]?.picture && (
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '95px',
                      height: '115px',
                      left: '45%',
                      bottom: '0%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 10px 24px rgba(0,0,0,0.13)',
                      border: '3px solid white',
                      transform: 'rotate(-10deg)',
                      zIndex: 6,
                    }}
                  >
                    <Box
                      component="img"
                      src={practitioners[7].picture}
                      alt={practitioners[7].name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}

                {/* Ninth Staff Image - Bottom Right Large */}
                {practitioners[8]?.picture && (
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '150px',
                      height: '170px',
                      right: '8%',
                      bottom: '8%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
                      border: '3px solid white',
                      transform: 'rotate(-14deg)',
                      zIndex: 5,
                    }}
                  >
                    <Box
                      component="img"
                      src={practitioners[8].picture}
                      alt={practitioners[8].name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}

                {/* Tenth Staff Image - Far Left Top */}
                {practitioners[9]?.picture && (
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '85px',
                      height: '105px',
                      left: '-2%',
                      top: '25%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                      border: '3px solid white',
                      transform: 'rotate(12deg)',
                      zIndex: 4,
                    }}
                  >
                    <Box
                      component="img"
                      src={practitioners[9].picture}
                      alt={practitioners[9].name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}

                {/* Eleventh Staff Image - Far Right Middle */}
                {practitioners[10]?.picture && (
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '95px',
                      height: '115px',
                      right: '-3%',
                      top: '35%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                      border: '3px solid white',
                      transform: 'rotate(-8deg)',
                      zIndex: 4,
                    }}
                  >
                    <Box
                      component="img"
                      src={practitioners[10].picture}
                      alt={practitioners[10].name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}

                {/* Twelfth Staff Image - Bottom Far Left */}
                {practitioners[11]?.picture && (
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '105px',
                      height: '125px',
                      left: '-1%',
                      bottom: '15%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 10px 24px rgba(0,0,0,0.13)',
                      border: '3px solid white',
                      transform: 'rotate(-15deg)',
                      zIndex: 5,
                    }}
                  >
                    <Box
                      component="img"
                      src={practitioners[11].picture}
                      alt={practitioners[11].name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}

                {/* Thirteenth Staff Image - Bottom Far Right */}
                {practitioners[12]?.picture && (
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '100px',
                      height: '120px',
                      right: '-2%',
                      bottom: '20%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 10px 24px rgba(0,0,0,0.13)',
                      border: '3px solid white',
                      transform: 'rotate(18deg)',
                      zIndex: 5,
                    }}
                  >
                    <Box
                      component="img"
                      src={practitioners[12].picture}
                      alt={practitioners[12].name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}

                {/* Fourteenth Staff Image - Very Bottom Left */}
                {practitioners[13]?.picture && (
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '80px',
                      height: '100px',
                      left: '20%',
                      bottom: '-3%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                      border: '3px solid white',
                      transform: 'rotate(5deg)',
                      zIndex: 6,
                    }}
                  >
                    <Box
                      component="img"
                      src={practitioners[13].picture}
                      alt={practitioners[13].name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}

                {/* Fifteenth Staff Image - Very Bottom Right */}
                {practitioners[14]?.picture && (
                  <Box
                    sx={{
                      position: 'absolute',
                      width: '90px',
                      height: '110px',
                      right: '20%',
                      bottom: '-2%',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                      border: '3px solid white',
                      transform: 'rotate(-12deg)',
                      zIndex: 6,
                    }}
                  >
                    <Box
                      component="img"
                      src={practitioners[14].picture}
                      alt={practitioners[14].name}
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                )}
              </Box>
            ) : (
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  minHeight: '400px',
                  borderRadius: 3,
                  background: 'linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Playfair Display, serif',
                    color: '#008d80',
                    fontSize: '1.2rem',
                  }}
                >
                  Our Team
                </Typography>
              </Box>
            )}
          </Box>

          {/* Right Column - Booking Notes */}
          <Box sx={{ flex: { xs: '1', md: '0 0 55%' }, display: 'flex', flexDirection: 'column', gap: 5, justifyContent: 'center' }}>
            {/* Pre-Booking Note */}
            {preBookingNote && (
              <Box
                sx={{
                  position: 'relative',
                  pl: 4,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    background: 'linear-gradient(180deg, #f27921 0%, #ff8c42 100%)',
                    borderRadius: '2px',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#f27921',
                    mb: 1.5,
                  }}
                >
                  Before You Book
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Source Sans Pro, sans-serif',
                    fontSize: '1.05rem',
                    lineHeight: 1.8,
                    color: '#333',
                  }}
                >
                  {preBookingNote}
                </Typography>
              </Box>
            )}

            {/* Post-Booking Instructions */}
            {postBookingInstructions && (
              <Box
                sx={{
                  position: 'relative',
                  pl: 4,
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: '4px',
                    background: 'linear-gradient(180deg, #008d80 0%, #00a895 100%)',
                    borderRadius: '2px',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#008d80',
                    mb: 1.5,
                  }}
                >
                  After Booking
                </Typography>
                <Typography
                  sx={{
                    fontFamily: 'Source Sans Pro, sans-serif',
                    fontSize: '1.05rem',
                    lineHeight: 1.8,
                    color: '#333',
                  }}
                >
                  {postBookingInstructions}
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

